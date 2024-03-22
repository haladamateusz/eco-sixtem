import pandas as pd

df = pd.read_csv('environmental_factors.csv')

print(df['environmentalFactorAverage'].max())
print(df['environmentalFactorAverage'].mean())
print(df['environmentalFactorAverage'].min())

