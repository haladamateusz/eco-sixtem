import pandas as pd

df = pd.read_csv('EUESGMANUFACTURER.csv')

data_top = df.head()

data_small = df[['swissValorNumber', 'companyLongName', 'ESGClassification', 'ESGFactorAmountLastYear']].dropna().copy()

SOCIAL_FACTOR_WHITELIST = ['Social and employee matters',
'Social'
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
                'socialFactorAverage': round(data_small[(data_small['companyLongName'] == cln) & (data_small['ESGClassification'].isin(SOCIAL_FACTOR_WHITELIST))]['ESGFactorAmountLastYear'].mean(),2)
            }])], ignore_index=True)

outfile2 = open('social_factors.csv', 'wb')
df_with_avg_values.to_csv(outfile2, index = False, header = True, sep = ',', encoding = 'utf-8')
outfile2.close()