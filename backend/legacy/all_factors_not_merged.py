import pandas as pd

df = pd.read_csv('input_data/EUESGMANUFACTURER.csv')

data_top = df.head()

data_small = df[['swissValorNumber', 'companyLongName', 'ISIN_BC', 'LEI', 'ESGClassification', 'ESGFactorAmountLastYear']].dropna().copy()


ESGClassificationWhiteList = ['Greenhouse gas emissions',
'Biodiversity',
'Water',
'Waste',
'Environmental',
'Fossil fuels',
'Energy efficiency',
'Social and employee matters',
'Social',
'MiFID/IDD Target Market - Manufacturer angle (from a client perspective)',
'German MiFID Market',
'MiFID Sustainability Preference Flag',
'AMF Doctrine',
'Scoping according to SFDR annex template',
'Main criterias used for a first screening of ESG related products'
]
UNIQUE_swissValorNumber = data_small['swissValorNumber'].unique()
UNIQUE_ESGClassification = data_small['ESGClassification'].unique()

UNIQUE_ESGClassification = list(filter(lambda value: value in ESGClassificationWhiteList, UNIQUE_ESGClassification))

df_with_avg_values = pd.DataFrame()

for svn in UNIQUE_swissValorNumber:
    for esgc in UNIQUE_ESGClassification:
        if data_small[(data_small['swissValorNumber'] == svn) & (data_small['ESGClassification'] == esgc)][
            'ESGFactorAmountLastYear'].any():
            print('running: ' + data_small[data_small['swissValorNumber'] == svn]['companyLongName'].iloc[0])
            print('swissValorNumber: ' + str(svn) + ',  ESGClassification:' + str(esgc))
            print(str(data_small[(data_small['swissValorNumber'] == svn) & (data_small['ESGClassification'] == esgc)][
                          'ESGFactorAmountLastYear'].mean()))

            df_with_avg_values = pd.concat([df_with_avg_values, pd.DataFrame([{
                'swissValorNumber': svn,
                'companyLongName': data_small[data_small['swissValorNumber'] == svn]['companyLongName'].iloc[0],
                'ISIN_BC': data_small[data_small['swissValorNumber'] == svn]['ISIN_BC'].iloc[0],
                'LEI' : data_small[data_small['swissValorNumber'] == svn]['LEI'].iloc[0],
                'ESGClassification': esgc,
                'ESGFactorAVG': round(data_small[(data_small['swissValorNumber'] == svn) & (data_small['ESGClassification'] == esgc)]['ESGFactorAmountLastYear'].mean(),2)
            }])], ignore_index=True)

outfile2 = open('all_factors.csv', 'wb')
df_with_avg_values.to_csv(outfile2, index = False, header = True, sep = ',', encoding = 'utf-8')
outfile2.close()
