import pandas as pd
import time
from pydash import get

from six_api.six_api_requests import FinancialDataAPI

dataframeFoundOnly = pd.read_csv('../input-data/lookup_status_found.csv')

findata = FinancialDataAPI('/Users/mateuszhalada/Hackaton_St_Gallen/eco-sixtem/backend/flaskr/certificates')


def sendEndOfDayHistoryRequest(companyLongName: str, ISIN_BC: str):
  time.sleep(1)
  print('sleeping with ', companyLongName, ISIN_BC)
  try:
    intradaySnapshot = findata.endOfDayHistory("ISIN_BC", [ISIN_BC])
  except:
    return 'ERROR'
  else:
    return get(intradaySnapshot, 'data.listings')[0]['lookupStatus']
