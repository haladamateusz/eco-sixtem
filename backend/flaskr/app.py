import pandas as pd
import urllib.parse
import datetime
from flask import Flask
from flask_cors import CORS
from data_processing_scripts.six_api_requests import FinancialDataAPI

app = Flask(__name__)
CORS(app)

findata = FinancialDataAPI('/Users/mateuszhalada/Hackaton_St_Gallen/eco-sixtem/backend/flaskr/certificates')


@app.route("/manufacturers")
def manufacturers():
    df = pd.read_csv('../input_data/available_manufacturers.csv')

    # df = df[['companyLongName', 'ISIN_BC']].drop_duplicates(subset='companyLongName')
    # print(len(list(df['companyLongName'].unique())))

    return df[['companyLongName', 'ISIN_BC']].to_json(orient="records")


@app.route("/manufacturers/<isin_bc>/intraday_snapshot")
def manufacturer_intraday_snapshot(isin_bc):
    return findata.intradaySnapshot("ISIN_BC", [isin_bc])


@app.route("/manufacturers/<isin_bc>/end_of_day_history")
def manufacturer_end_of_day_history(isin_bc):
    thirty_days_ago = (datetime.datetime.today() - datetime.timedelta(days=30)).strftime("%Y-%m-%d")

    return findata.endOfDayHistory("ISIN_BC", [isin_bc], thirty_days_ago, thirty_days_ago)

#@app.route("/company-esg/<company>")
#def company_esg(company):
#    e = pd.read_csv('../environmental_factors.csv')
#    s = pd.read_csv('../social_factors.csv')
#    g = pd.read_csv('../governance_factors.csv')
#    parsedCompanyName = urllib.parse.unquote(company)
#    return {
#        'environmental': float(e[e['companyLongName'] == parsedCompanyName]['environmentalFactorAverage'].iloc[0]),
#        'social': float(s[s['companyLongName'] == parsedCompanyName]['socialFactorAverage'].iloc[0]),
#        'governance': float(g[g['companyLongName'] == parsedCompanyName]['governanceFactorAverage'].iloc[0])
#    }
