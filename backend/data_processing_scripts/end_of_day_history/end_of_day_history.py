import pandas as pd
import datetime
import time
from pydash import get

from six_api.financial_data import FinancialDataAPI

#dataframeFoundOnly = pd.read_csv('../input_data/lookup_status_found.csv')

excel_data = {
  'LIGHT': 'EUESGMANUFACTURER-LIGHT',
  'STANDARD': 'EUESGMANUFACTURER',
}

filename = excel_data['STANDARD']

df = pd.read_csv(f'''../../input_data/{filename}.csv''')

data = df[['companyLongName', 'ISIN_BC', 'LEI' 'ESGClassification', 'ESGFactorAmountLastYear', 'ESGClassSymbol']].dropna().drop_duplicates(subset='companyLongName').copy()

findata = FinancialDataAPI('/Users/mateuszhalada/Hackaton_St_Gallen/eco-sixtem/backend/flaskr/certificates')

today = datetime.datetime.today().strftime("%Y-%m-%d")
thirty_days_ago = (datetime.datetime.today() - datetime.timedelta(days=30)).strftime("%Y-%m-%d")


# print(thirty_days_ago)


def send_end_of_day_history_request(companyLongName: str, ISIN_BC: str, dateFrom: str, dateTo: str):
  time.sleep(1)
  # print('Making API request for: ', companyLongName, ISIN_BC)
  try:
    intraday_snapshot = findata.endOfDayHistory("ISIN_BC", [ISIN_BC], dateFrom, dateTo)
  except:
    return 'ERROR'
  else:
    print(get(intraday_snapshot, 'data.listings')[0]['lookupStatus'])
    return get(intraday_snapshot, 'data.listings')[0]['lookupStatus']


data.reset_index(drop=True, inplace=True)

for index, row in data.iterrows():
  print(str(index+1) + ' of ' + str(data[data.columns[0]].count()+1))
  val = send_end_of_day_history_request(row['companyLongName'], row['ISIN_BC'], thirty_days_ago, thirty_days_ago)
  data.loc[df.index[index], 'lookupStatus'] = val
  lookupStatusFile = open(f'''lookup_status_end_of_day_history_{filename}.csv''', 'wb')
  data.to_csv(lookupStatusFile, index=False, header=True, sep=',', encoding='utf-8')
  lookupStatusFile.close()

dataframeWithLookupStatus = pd.read_csv(f'''./lookup_status_end_of_day_history_{filename}.csv''')
dataframeFoundOnly = dataframeWithLookupStatus[dataframeWithLookupStatus['lookupStatus'] == 'FOUND']

foundOnlyFile = open(f'''lookup_status_end_of_day_history_found_only_{filename}.csv''', 'wb')
dataframeFoundOnly.to_csv(foundOnlyFile, index=False, header=True, sep=',', encoding='utf-8')
foundOnlyFile.close()
