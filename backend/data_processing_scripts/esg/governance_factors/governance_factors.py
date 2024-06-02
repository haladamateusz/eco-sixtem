import pandas as pd

df = pd.read_csv('../../found_only_esg/found_only_esg.csv')

GOVERNANCE_FACTOR_WHITELIST = [
'MiFID/IDD Target Market - Manufacturer angle (from a client perspective)',
'German MiFID Market',
'MiFID Sustainability Preference Flag',
'AMF Doctrine',
'Scoping according to SFDR annex template',
'Main criterias used for a first screening of ESG related products'
]
UNIQUE_companyLongName = df['companyLongName'].unique()

df_with_avg_values = pd.DataFrame()

for cln in UNIQUE_companyLongName:
    df_with_avg_values = pd.concat([df_with_avg_values, pd.DataFrame([{
    'companyLongName': df[df['companyLongName'] == cln]['companyLongName'].iloc[0],
    'ISIN_BC': df[df['companyLongName'] == cln]['ISIN_BC'].iloc[0],
    'governanceFactorAverage': round(df[(df['companyLongName'] == cln) &
                                    (df['ESGClassification'].isin(GOVERNANCE_FACTOR_WHITELIST))]['ESG'].mean(),2)
    }])], ignore_index=True)

df_with_avg_values.fillna(0, inplace=True)

outfile = open('governance_factors.csv', 'wb')
df_with_avg_values.to_csv(outfile, index = False, header = True, sep = ',', encoding = 'utf-8')
outfile.close()
