import pandas as pd

df = pd.read_csv('EUESGMANUFACTURER.csv')

data_top = df.head()

data_small = df[['swissValorNumber', 'companyLongName', 'ESGClassification', 'ESGFactorAmountLastYear']].dropna().copy()

GOVERNANCE_FACTOR_WHITELIST = [
'MiFID/IDD Target Market - Manufacturer angle (from a client perspective)',
'German MiFID Market',
'MiFID Sustainability Preference Flag',
'AMF Doctrine',
'Scoping according to SFDR annex template',
'Main criterias used for a first screening of ESG related products'
]
UNIQUE_companyLongName = data_small['companyLongName'].unique()

df_with_avg_values = pd.DataFrame()

for cln in UNIQUE_companyLongName:
        if data_small[(data_small['companyLongName'] == cln)][
            'ESGFactorAmountLastYear'].any():
            #print('running: ' + data_small[data_small['swissValorNumber'] == cln]['companyLongName'].iloc[0])
            #print('swissValorNumber: ' + str(cln))
            #print(str(data_small[(data_small['swissValorNumber'] == cln) & (data_small['ESGClassification'].isin(E_FACTOR_WHITELIST))][
            #              'ESGFactorAmountLastYear'].mean()))

            df_with_avg_values = pd.concat([df_with_avg_values, pd.DataFrame([{
                #'swissValorNumber': svn,
                'companyLongName': data_small[data_small['companyLongName'] == cln]['companyLongName'].iloc[0],
                'governanceFactorAverage': round(data_small[(data_small['companyLongName'] == cln) & (data_small['ESGClassification'].isin(GOVERNANCE_FACTOR_WHITELIST))]['ESGFactorAmountLastYear'].mean(),2)
            }])], ignore_index=True)

outfile2 = open('governance_factors.csv', 'wb')
df_with_avg_values.to_csv(outfile2, index = False, header = True, sep = ',', encoding = 'utf-8')
outfile2.close()