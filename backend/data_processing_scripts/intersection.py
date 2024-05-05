import pandas as pd

excel_data = {
  'LIGHT': 'EUESGMANUFACTURER-LIGHT',
  'STANDARD': 'EUESGMANUFACTURER',
}

filename = excel_data['STANDARD']

intraday_snapshots_dataframe = pd.read_csv(f'''./lookup_status_intraday_snapshots_found_only_{filename}.csv''')
end_of_day_history_dataframe = pd.read_csv(f'''./lookup_status_end_of_day_history_found_only_{filename}.csv''')

intersection = pd.merge(intraday_snapshots_dataframe, end_of_day_history_dataframe, how='inner', on=['companyLongName', 'ISIN_BC', 'LEI','lookupStatus'])

intersectionFile = open(f'''intersection_{filename}.csv''', 'wb')
intersection.to_csv(intersectionFile, index=False, header=True, sep=',', encoding='utf-8')
intersectionFile.close()
