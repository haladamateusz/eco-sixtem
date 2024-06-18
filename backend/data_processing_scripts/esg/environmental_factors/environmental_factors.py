import pandas as pd

df = pd.read_csv('../../found_only_esg/found_only_esg.csv')

ENVIRONMENTAL_FACTOR_WHITELIST = ['Greenhouse gas emissions',
'Biodiversity',
'Water',
'Waste',
'Environmental',
'Fossil fuels',
'Energy efficiency',
]
UNIQUE_companyLongName = df['companyLongName'].unique()

df_with_avg_values = pd.DataFrame()

for cln in UNIQUE_companyLongName:
    df_with_avg_values = pd.concat([df_with_avg_values, pd.DataFrame([{
    'companyLongName': df[df['companyLongName'] == cln]['companyLongName'].iloc[0],
    'ISIN_BC': df[df['companyLongName'] == cln]['ISIN_BC'].iloc[0],
    'environmentalFactorAverage': round(df[(df['companyLongName'] == cln) &
                                    (df['ESGClassification'].isin(ENVIRONMENTAL_FACTOR_WHITELIST))]['ESG'].mean(),2)
    }])], ignore_index=True)

df_with_avg_values.fillna(0, inplace=True)

outfile = open('environmental_factors.csv', 'wb')
df_with_avg_values.to_csv(outfile, index = False, header = True, sep = ',', encoding = 'utf-8')
outfile.close()
