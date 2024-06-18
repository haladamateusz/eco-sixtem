import pandas as pd
intersection = pd.read_csv(f'''../intersection/intersection_EUESGMANUFACTURER.csv''')
all_data = pd.read_csv(f'''../../input_data/EUESGMANUFACTURER.csv''')

found = all_data[all_data['ISIN_BC'].isin(intersection['ISIN_BC'])]

found_light = found[['companyLongName', 'ISIN_BC', 'ESGClassification', 'ESGFactorAmountLastYear', 'ESGClassSymbol']].copy()

for index, row in found_light.iterrows():
  if not pd.isnull(row['ESGFactorAmountLastYear']):
    found_light.loc[index, 'ESG'] = row['ESGFactorAmountLastYear']
  else:
    if 'Yes' in str(row['ESGClassSymbol']):
      found_light.loc[index, 'ESG'] = 1
    else:
      found_light.loc[index, 'ESG'] = 0

found_light.drop(columns=['ESGFactorAmountLastYear', 'ESGClassSymbol'], inplace=True)

found_light.to_csv(f'''./found_only_esg.csv''', index=False)
