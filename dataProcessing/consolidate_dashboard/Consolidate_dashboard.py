import pandas as pd
import re
from datetime import datetime
import numpy as np

# Convert all dates to "Month DD, YYYY"
# Different sheets were formatted differently, this standardizes
def parse_sheet_date(sheet_name):
    try:
        parts = sheet_name.replace('Copy of ', '').strip().split('.')
        if len(parts) == 3:
            month, day, year = parts
            year = '20' + year if len(year) == 2 else year
            return pd.to_datetime(f"{year}-{month.zfill(2)}-{day.zfill(2)}")
    except:
        return None
    return None

# Main
def consolidate_dashboard(input_file, output_file):
    xl = pd.ExcelFile(input_file)
    
    # Loops through each sheet, which is a week, and adds it to list "weekly_sheets"
    weekly_sheets = []
    for sheet in xl.sheet_names:
        sheet_date = parse_sheet_date(sheet)
        if sheet_date:
            weekly_sheets.append((sheet, sheet_date))
    
    weekly_sheets.sort(key=lambda x: x[1]) #Oldest date first
    
    all_data = [] #holds processed data
    skipped_sheets = [] #just in case
    
    for sheet_name, sheet_date in weekly_sheets: #loop through every sheet
        try:
            df = pd.read_excel(input_file, sheet_name=sheet_name) #reads data from sheet
            
            if 'oneo' in df.columns: # keyword is present in all sheets that are the targeted format
                
                # data we want
                core_columns = ['oneo', 'Date', 'Check #', 'Description', 'Project Name', 'Amount', 'Notes']
                available_cols = [col for col in core_columns if col in df.columns]
                df_clean = df[available_cols].copy()
                
                df_clean = df_clean[df_clean['oneo'].notna()] # only use rows where "oneo" column has value (valid entries)
                
                # keep only rows with data
                df_clean = df_clean[
                    (df_clean['Amount'].notna()) | 
                    (df_clean['Description'].notna() if 'Description' in df_clean.columns else False) | 
                    (df_clean['Project Name'].notna() if 'Project Name' in df_clean.columns else False)
                ]
            # keep skipped sheets marked    
            else:
                skipped_sheets.append(sheet_name)
                continue
            
            # if valid data found, add it
            if len(df_clean) > 0:
                df_clean['Week_Of'] = sheet_date
                df_clean['Source_Sheet'] = sheet_name
                all_data.append(df_clean)
        
        except Exception as e:
            print(f"  -> Error processing {sheet_name}: {str(e)}")
            skipped_sheets.append(sheet_name)
    
    # error handling
    if len(all_data) == 0:
        return None
    
    consolidated_df = pd.concat(all_data, ignore_index=True) #stack sheets together
    
    consolidated_df.columns = consolidated_df.columns.str.replace('#', 'Number').str.replace(' ', '_') # clean column names
    
    # reorder columns
    column_order = ['Week_Of', 'Date', 'oneo', 'Check_Number', 'Description', 
                    'Project_Name', 'Amount', 'Notes', 'Source_Sheet']
    
    final_columns = [col for col in column_order if col in consolidated_df.columns]
    consolidated_df = consolidated_df[final_columns]
    
    # sort by week then amount
    consolidated_df = consolidated_df.sort_values(['Week_Of', 'Amount'], ascending=[False, False])
    
    # fix weird formatting
    consolidated_df['Week_Of'] = consolidated_df['Week_Of'].dt.date

    # Creates new Excel
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        consolidated_df.to_excel(writer, sheet_name='Consolidated_Payments', index=False) # create consolidated_payments
        
        # creates weekly_summary
        weekly_summary = consolidated_df.groupby('Week_Of').agg({
            'Amount': ['sum', 'count', 'mean'],
            'Project_Name': 'nunique'
        }).round(2)
        weekly_summary.columns = ['Total_Amount', 'Transaction_Count', 'Avg_Amount', 'Unique_Projects']
        weekly_summary.to_excel(writer, sheet_name='Weekly_Summary')
        
        # creates project_summary
        project_summary = consolidated_df.groupby('Project_Name').agg({
            'Amount': ['sum', 'count', 'mean'],
            'Week_Of': ['min', 'max']
        }).round(2)
        project_summary.columns = ['Total_Spent', 'Transaction_Count', 'Avg_Transaction', 'First_Payment', 'Last_Payment']
        project_summary = project_summary.sort_values('Total_Spent', ascending=False)
        project_summary.to_excel(writer, sheet_name='Project_Summary')
        
        # creates vendor_summary
        vendor_summary = consolidated_df.groupby('Description').agg({
            'Amount': ['sum', 'count'],
            'Project_Name': 'nunique'
        }).round(2)
        vendor_summary.columns = ['Total_Paid', 'Payment_Count', 'Projects']
        vendor_summary = vendor_summary.sort_values('Total_Paid', ascending=False)
        vendor_summary.to_excel(writer, sheet_name='Vendor_Summary')
        
        # creates payment_type_summary
        payment_type_summary = consolidated_df.groupby(['oneo', 'Week_Of']).agg({
            'Amount': 'sum'
        }).unstack(fill_value=0)
        payment_type_summary.to_excel(writer, sheet_name='Payment_Type_by_Week')
    
    return consolidated_df

if __name__ == "__main__":
    input_file = r'C:\Users\brett\OneDrive\Desktop\temp\The Dashboard.xlsx'
    output_file = r'C:\Users\brett\OneDrive\Desktop\temp\Consolidated_Dashboard.xlsx'
    
    df = consolidate_dashboard(input_file, output_file)