import pandas as pd
import time
from six_api.six_api_requests import FinancialDataAPI
from pydash import get

df = pd.read_csv('../input-data/EUESGMANUFACTURER.csv')

data = df[['companyLongName', 'ISIN_BC', 'LEI']].dropna().drop_duplicates(subset='companyLongName').copy()
# print(data.info())

findata = FinancialDataAPI('/Users/mateuszhalada/Hackaton_St_Gallen/eco-sixtem/backend/flaskr/certificates')

def sendIntradaySnapshotRequest(companyLongName: str, ISIN_BC: str):
    time.sleep(1)
    print('sleeping with ', companyLongName, ISIN_BC)
    try:
        intradaySnapshot = findata.intradaySnapshot("ISIN_BC", [ISIN_BC])
    except:
        return 'ERROR'
    else:
        return get(intradaySnapshot, 'data.listings')[0]['lookupStatus']


data.reset_index()

# print(first_row)
# first_row = data.iloc[0]
#val = sendIntradayRequest(data['companyLongName'].iloc[0], data['ISIN_BC'].iloc[0])


for index, row in data.iterrows():
    val = sendIntradaySnapshotRequest(row['companyLongName'], row['ISIN_BC'])
    data.loc[df.index[index], 'lookupStatus'] = val
    lookupStatusFile = open('lookup_status.csv', 'wb')
    data.to_csv(lookupStatusFile, index=False, header=True, sep=',', encoding='utf-8')
    lookupStatusFile.close()


dataframeWithLookupStatus = pd.read_csv('./lookup_status.csv')
dataframeFoundOnly = dataframeWithLookupStatus[dataframeWithLookupStatus['lookupStatus'] == 'FOUND']

foundOnlyFile = open('lookup_status_found.csv', 'wb')
dataframeFoundOnly.to_csv(foundOnlyFile, index=False, header=True, sep=',', encoding='utf-8')
foundOnlyFile.close()
