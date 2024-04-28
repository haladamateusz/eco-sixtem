import json
import pandas as pd
from six_api_requests import FinancialDataAPI
from pydash import get
import urllib.error

df = pd.read_csv('../input-data/EUESGMANUFACTURER.csv')

data = df[['companyLongName', 'ISIN_BC', 'LEI']].dropna().drop_duplicates(subset='companyLongName').copy()

import time
# print(data.info())

# first_row = data.iloc[0]

# print(first_row)

findata = FinancialDataAPI('/Users/mateuszhalada/Hackaton_St_Gallen/eco-sixtem/backend/flaskr/certificates')


def sendIntradayRequest(companyLongName: str, ISIN_BC: str):
    time.sleep(1)
    print('sleeping with ', companyLongName, ISIN_BC)
    try:
        intradaySnapshot = findata.intradaySnapshot("ISIN_BC", [ISIN_BC])
    except:
        return 'ERROR'
    else:
        return get(intradaySnapshot, 'data.listings')[0]['lookupStatus']


#result = [sendIntradayRequest(cln, isin_bc) for cln, isin_bc in zip(data['companyLongName'], data['ISIN_BC']) ]

data.reset_index()

#val = sendIntradayRequest(data['companyLongName'].iloc[0], data['ISIN_BC'].iloc[0])

#for index, row in data.iterrows():
#    val = sendIntradayRequest(row['companyLongName'], row['ISIN_BC'])
#    data.loc[df.index[index], 'lookupStatus'] = val
#    outfile2 = open('lookup_status.csv', 'wb')
#    data.to_csv(outfile2, index=False, header=True, sep=',', encoding='utf-8')
#    outfile2.close()


dataWithLookupStatus = pd.read_csv('./lookup_status.csv')
data2 = dataWithLookupStatus[dataWithLookupStatus['lookupStatus'] == 'FOUND']

outfile3 = open('lookup_status_found.csv', 'wb')
data2.to_csv(outfile3, index=False, header=True, sep=',', encoding='utf-8')
outfile3.close()



# sample1 = findata.intradaySnapshot("ISIN_BC", [first_row['ISIN_BC']])

# print(json.dumps(sample1, sort_keys=True, indent=4))
# print(sample1['data']['listings'][0]['lookupStatus'])
