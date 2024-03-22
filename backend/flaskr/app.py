from flask import Flask
import pandas as pd
from flask_cors import CORS
import urllib.parse

app = Flask(__name__)
CORS(app)

@app.route("/company-names")
def company_names():
    df = pd.read_csv('../all_factors.csv')

    return list(df['companyLongName'].unique())

@app.route("/company-esg/<company>")
def company_esg(company):
    e = pd.read_csv('../environmental_factors.csv')
    s = pd.read_csv('../social_factors.csv')
    g = pd.read_csv('../governance_factors.csv')
    parsedCompanyName = urllib.parse.unquote(company)
    return {
        'environmental': float(e[e['companyLongName'] == parsedCompanyName]['environmentalFactorAverage'].iloc[0]),
        'social': float(s[s['companyLongName'] == parsedCompanyName]['socialFactorAverage'].iloc[0]),
        'governance': float(g[g['companyLongName'] == parsedCompanyName]['governanceFactorAverage'].iloc[0])
    }
