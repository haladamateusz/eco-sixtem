import pandas as pd
import time
from six_api_requests import FinancialDataAPI
from pydash import get

excel_data = {
  'LIGHT': 'EUESGMANUFACTURER-LIGHT',
  'STANDARD': 'EUESGMANUFACTURER',
}

filename = excel_data['STANDARD']

df = pd.read_csv(f'''../input_data/{filename}.csv''')

data = df[['companyLongName', 'ISIN_BC', 'LEI']].dropna().drop_duplicates(subset='companyLongName').copy()
# print(data.info())

findata = FinancialDataAPI('/Users/mateuszhalada/Hackaton_St_Gallen/eco-sixtem/backend/flaskr/certificates')


def send_intraday_snapshot_request(companyLongName: str, ISIN_BC: str):
    time.sleep(1)
    # print('Making API request for: ', companyLongName, ISIN_BC)
    try:
        intradaySnapshot = findata.intradaySnapshot("ISIN_BC", [ISIN_BC])
    except:
        return 'ERROR'
    else:
        print(get(intradaySnapshot, 'data.listings')[0]['lookupStatus'])
        return get(intradaySnapshot, 'data.listings')[0]['lookupStatus']


data.reset_index()

# print(first_row)
# first_row = data.iloc[0]
#val = sendIntradayRequest(data['companyLongName'].iloc[0], data['ISIN_BC'].iloc[0])

data.reset_index(drop=True, inplace=True)

for index, row in data.iterrows():
    print(str(index + 1) + ' of ' + str(data[data.columns[0]].count() + 1))
    val = send_intraday_snapshot_request(row['companyLongName'], row['ISIN_BC'])
    data.loc[df.index[index], 'lookupStatus'] = val
    lookupStatusFile = open(f'''lookup_status_intraday_snapshots_{filename}.csv''', 'wb')
    data.to_csv(lookupStatusFile, index=False, header=True, sep=',', encoding='utf-8')
    lookupStatusFile.close()


dataframeWithLookupStatus = pd.read_csv(f'''./lookup_status_intraday_snapshots_{filename}.csv''')
dataframeFoundOnly = dataframeWithLookupStatus[dataframeWithLookupStatus['lookupStatus'] == 'FOUND']

foundOnlyFile = open(f'''lookup_status_intraday_snapshots_found_only_{filename}.csv''', 'wb')
dataframeFoundOnly.to_csv(foundOnlyFile, index=False, header=True, sep=',', encoding='utf-8')
foundOnlyFile.close()
