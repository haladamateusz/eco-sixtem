import pandas as pd
import datetime
from flask import Flask
from flask_cors import CORS
from six_api.financial_data import FinancialDataAPI
from pydash import get

app = Flask(__name__)
CORS(app)

findata = FinancialDataAPI('/Users/mateuszhalada/Hackaton_St_Gallen/eco-sixtem/backend/flaskr/certificates')


def get_day_month_ago():
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
    intraday_snapshot_market_data = get(intraday_snapshot_details, 'marketData.intradaySnapshot')

    days = get_day_month_ago()

    thirty_days_ago = (datetime.datetime.today() - datetime.timedelta(days=days)).strftime("%Y-%m-%d")
    print(thirty_days_ago)

    end_of_day_history_request = findata.endOfDayHistory("ISIN_BC", [isin_bc], thirty_days_ago, thirty_days_ago)
    end_of_day_history_details = get(end_of_day_history_request, 'data.listings')[0]
    end_of_day_history_market_data = get(end_of_day_history_details, 'marketData.endOfDayHistory')[0]

    df = pd.read_csv('../input_data/available_manufacturers.csv')

    if 'high' not in intraday_snapshot_market_data or 'low' not in intraday_snapshot_market_data:
        intraday_snapshot_avg = intraday_snapshot_market_data['last']['value']
    else:
        intraday_snapshot_avg = (intraday_snapshot_market_data['high']['value'] +
                                 intraday_snapshot_market_data['low']['value']) / 2

    if 'high' not in end_of_day_history_market_data or 'low' not in end_of_day_history_market_data:
        end_of_day_history_avg = end_of_day_history_market_data['close']
    else:
        end_of_day_history_avg = (end_of_day_history_market_data['high'] + end_of_day_history_market_data['low']) / 2

    revenue = round(intraday_snapshot_avg - end_of_day_history_avg, 2)

    return {
      'ISIN_BC': isin_bc,
      'listingShortName': get(intraday_snapshot_details, 'lookup.listingShortName'),
      'companyLongName': df[df['ISIN_BC'] == isin_bc]['companyLongName'].iloc[0],
      'revenue': revenue
    }


@app.route("/manufacturers/<isin_bc>/intraday_snapshot")
def manufacturer_intraday_snapshot(isin_bc):
    request = findata.intradaySnapshot("ISIN_BC", [isin_bc])
    return get(request, 'data.listings')[0]


@app.route("/manufacturers/<isin_bc>/end_of_day_history")
def manufacturer_end_of_day_history(isin_bc):
    days_ago = get_day_month_ago()

    thirty_days_ago = (datetime.datetime.today() - datetime.timedelta(days=days_ago)).strftime("%Y-%m-%d")

    request = findata.endOfDayHistory("ISIN_BC", [isin_bc], thirty_days_ago, thirty_days_ago)
    return get(request, 'data.listings')[0]


@app.route("/manufacturers/<isin_bc>/esg")
def esg_score(isin_bc):
    dfe = pd.read_csv('../data_processing_scripts/esg/environmental_factors/environmental_factors.csv')
    dfs = pd.read_csv('../data_processing_scripts/esg/social_factors/social_factors.csv')
    dfg = pd.read_csv('../data_processing_scripts/esg/governance_factors/governance_factors.csv')

    return {
        'ISIN_BC': isin_bc,
        'environmental': float(dfe[dfe['ISIN_BC'] == isin_bc]['environmentalFactorAverage'].iloc[0]),
        'social': float(dfs[dfs['ISIN_BC'] == isin_bc]['socialFactorAverage'].iloc[0]),
        'governance': float(dfg[dfg['ISIN_BC'] == isin_bc]['governanceFactorAverage'].iloc[0])
    }

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
