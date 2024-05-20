import pandas as pd
import datetime
from flask import Flask
from flask_cors import CORS
from data_processing_scripts.six_api_requests import FinancialDataAPI
from pydash import get

app = Flask(__name__)
CORS(app)

findata = FinancialDataAPI('/Users/mateuszhalada/Hackaton_St_Gallen/eco-sixtem/backend/flaskr/certificates')


def getDayMonthAgo():
    days_ago = 30
    # check if 30 days ago was a weekend
    day_thirty_days_ago = int((datetime.datetime.today() - datetime.timedelta(days=days_ago)).strftime("%w"))

    if day_thirty_days_ago == 0:  # sunday
      days_ago -= 1
    if day_thirty_days_ago == 6:  # saturday
      days_ago -= 2
    return days_ago

@app.route("/manufacturers")
def manufacturers():
    df = pd.read_csv('../input_data/available_manufacturers.csv')

    # df = df[['companyLongName', 'ISIN_BC']].drop_duplicates(subset='companyLongName')
    # print(len(list(df['companyLongName'].unique())))

    return df[['companyLongName', 'ISIN_BC']].to_json(orient="records")


@app.route("/manufacturers/<isin_bc>/revenue")
def manufacturer_revenue(isin_bc):

    intraday_snapshot_request = findata.intradaySnapshot("ISIN_BC", [isin_bc])
    intraday_snapshot_details = get(intraday_snapshot_request, 'data.listings')[0]
    intraday_snapshot_market_data = get(intraday_snapshot_details, 'marketData.intradaySnapshot')[0]

    days_ago = getDayMonthAgo()
    thirty_days_ago = (datetime.datetime.today() - datetime.timedelta(days=days_ago)).strftime("%Y-%m-%d")

    end_of_day_history_request = findata.endOfDayHistory("ISIN_BC", [isin_bc], thirty_days_ago, thirty_days_ago)
    end_of_day_history_details = get(end_of_day_history_request, 'data.listings')[0]
    end_of_day_history_market_data = get(end_of_day_history_details, 'marketData.endOfTheDayHistory')[0]


    df = pd.read_csv('../input_data/available_manufacturers.csv')

    intraday_snapshot_avg =

    brr = {
      'ISIN_BC': isin_bc,
      'listingShortName': get(intraday_snapshot_details, 'lookup.listingShortName'),
      'companyLongName': df[df['ISIN_BC'] == isin_bc]['companyLongName'].iloc[0],
      'revenue': 10
    }

    print(brr)
    return brr


@app.route("/manufacturers/<isin_bc>/intraday_snapshot")
def manufacturer_intraday_snapshot(isin_bc):
    request = findata.intradaySnapshot("ISIN_BC", [isin_bc])
    return get(request, 'data.listings')[0]

@app.route("/manufacturers/<isin_bc>/end_of_day_history")
def manufacturer_end_of_day_history(isin_bc):
    days_ago = getDayMonthAgo()

    thirty_days_ago = (datetime.datetime.today() - datetime.timedelta(days=days_ago)).strftime("%Y-%m-%d")

    request = findata.endOfDayHistory("ISIN_BC", [isin_bc], thirty_days_ago, thirty_days_ago)
    details = get(request, 'data.listings')[0]

    return details

# @app.route("/company-esg/<company>")
# def company_esg(company):
#    e = pd.read_csv('../environmental_factors.csv')
#    s = pd.read_csv('../social_factors.csv')
#    g = pd.read_csv('../governance_factors.csv')
#    parsedCompanyName = urllib.parse.unquote(company)
#    return {
#        'environmental': float(e[e['companyLongName'] == parsedCompanyName]['environmentalFactorAverage'].iloc[0]),
#        'social': float(s[s['companyLongName'] == parsedCompanyName]['socialFactorAverage'].iloc[0]),
#        'governance': float(g[g['companyLongName'] == parsedCompanyName]['governanceFactorAverage'].iloc[0])
#    }
