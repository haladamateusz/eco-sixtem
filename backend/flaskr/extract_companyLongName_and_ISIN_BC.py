import json
import pandas as pd
from six_api_requests import FinancialDataAPI

df = pd.read_csv('../input-data/EUESGMANUFACTURER.csv')

data = df[['companyLongName', 'ISIN_BC', 'LEI']].dropna().drop_duplicates(subset='companyLongName').copy()

import time
# print(data.info())

# first_row = data.iloc[0]

# print(first_row)

findata = FinancialDataAPI('/Users/mateuszhalada/Hackaton_St_Gallen/eco-sixtem/backend/flaskr/certificates')


def sendIntradayRequest(companyLongName: str, ISIN_BC: str):
    time.sleep(1)
    print('sleeping with ', companyLongName)
    return {
      'status': findata.intradaySnapshot("ISIN_BC", [ISIN_BC]),
      'companyLongName': companyLongName
    }


result = [sendIntradayRequest(cln, isin_bc) for cln, isin_bc in zip(data['companyLongName'], data['ISIN_BC']) ]
print(result)

# sample1 = findata.intradaySnapshot("ISIN_BC", [first_row['ISIN_BC']])

# print(json.dumps(sample1, sort_keys=True, indent=4))
# print(sample1['data']['listings'][0]['lookupStatus'])
