import {core} from '@salesforce/command';
import { Util } from './Util';

export class Queries {
    private static isB2B;

    public static setIsB2B(isB2B: boolean){
        this.isB2B = isB2B;
    }

    public static async queryRecordTypes(conn: core.Connection): Promise<String[]> {
        Util.log('--- exporting record Types');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Id, Name, DeveloperName, SObjectType FROM RecordType", 
        null,
        function (err, res) {
            if (err) reject('error retrieving record types: ' + err);
            Util.log("--- record types: " + res.records.length);
            resolve(res.records);
        });
    })
    }

    public static async queryStdPricebookEntryIds(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting STD Pricebook Entry Ids');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Id FROM PricebookEntry WHERE (Product2.Name IN (" + Util.setToIdString(productList) + ") OR Product2.enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(productList) + ")) AND Pricebook2Id != null AND Pricebook2.IsStandard = true AND product2.isactive = true AND IsActive = true", 
            null,
            function (err, res) {
                if (err) { 
                    reject('error retrieving Std Pricebook Entry Ids: ' + err);
                    return;
                }
                Util.log("--- Std Pricebook Entry Ids: " + res.records.length);
                resolve(res.records);
            });
        })
        }

    public static async queryPricebookEntryIds(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting Pricebook Entry Ids');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
            conn.query("SELECT Id FROM PricebookEntry WHERE (Product2.Name IN (" + Util.setToIdString(productList) + ") OR Product2.enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(productList) + ")) AND Pricebook2Id != null AND Pricebook2.IsStandard = false AND product2.isactive = true AND IsActive = true",
            null,
            function (err, res) {
                if (err) { 
                    reject('error retrieving Pricebook Entry Ids: ' + err);
                    return;
                }
                Util.log("--- Pricebook Entry Ids: " + res.records.length);
                resolve(res.records);
            });
        })
        }

    public static async queryProductIds(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting product ids');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Id, enxCPQ__TECH_External_Id__c FROM Product2 WHERE (Name IN (" + Util.setToIdString(productList) + ") OR enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(productList) + ")) AND IsActive = true",
        null,
        function (err, res) {
            if (err) reject('error retrieving product ids: ' + err);
            Util.log("--- product ids: " + res.records.length);
            resolve(res.records);
        });
    })
    }
    public static async queryProductAttributeIds(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting product attribute ids');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Id FROM enxCPQ__ProductAttribute__c WHERE enxCPQ__Product__r.Name IN (" + Util.setToIdString(productList) + ")", 
        null,
        function (err, res) {
            if (err) reject('error retrieving product attribute ids: ' + err);
            Util.log("--- product attribute ids: " + res.records.length);
            resolve(res.records);
        });
    })
    }
    public static async queryPricebooksIds(conn: core.Connection): Promise<String[]> {
        Util.log('--- exporting  pricebook ids');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Id, enxCPQ__TECH_External_Id__c, IsStandard FROM Pricebook2", 
        null,
        function (err, res) {
            if (err) reject('error retrieving pricebook ids: ' + err);
            Util.log("--- pricebooks ids: " + res.records.length);
            resolve(res.records);
        });
    })
}
    public static async queryStdPricebookEntries(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting std pbe');
        let queryString = this.isB2B 
        ? "SELECT Pricebook2.enxCPQ__TECH_External_Id__c, Product2.enxCPQ__TECH_External_Id__c, IsActive, enxCPQ__Charge_List_Price__c, CurrencyIsoCode, enxCPQ__Current_Pricebook_Inventory__c, enxCPQ__Current_Pricebook_Lead_Time__c, UnitPrice, enxCPQ__MRC_List__c, enxB2B__MRC_List__c, enxCPQ__OTC_List__c, enxB2B__OTC_List__c, Pricebook2Id, enxCPQ__Price_Modifier_Amount__c, enxCPQ__Price_Modifier_Percent__c, enxCPQ__Price_Override__c, Product2Id, enxB2B__Service_Capex__c, UseStandardPrice FROM PricebookEntry WHERE (Product2.Name IN ("
        : "SELECT Pricebook2.enxCPQ__TECH_External_Id__c, Product2.enxCPQ__TECH_External_Id__c, IsActive, enxCPQ__Charge_List_Price__c, CurrencyIsoCode, enxCPQ__Current_Pricebook_Inventory__c, enxCPQ__Current_Pricebook_Lead_Time__c, UnitPrice, enxCPQ__MRC_List__c, enxCPQ__OTC_List__c, Pricebook2Id, enxCPQ__Price_Modifier_Amount__c, enxCPQ__Price_Modifier_Percent__c, enxCPQ__Price_Override__c, Product2Id, UseStandardPrice FROM PricebookEntry WHERE (Product2.Name IN ("
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query(queryString + Util.setToIdString(productList) + ") OR Product2.enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(productList) + ")) AND Pricebook2.IsStandard = true AND Product2.RecordType.Name != 'Charge Element' AND IsActive = true", 
        null,
        function (err, res) {
            if (err) reject('error retrieving std pricebook entries: ' + err);
            Util.log("--- std pricebook entries: " + res.records.length);
            resolve(res.records);
        });
    })
}

public static async queryPricebookEntryCurrencies(conn: core.Connection, productList: Set<String>): Promise<String[]> {
    Util.log('--- exporting  pricebook entry currencies');
    return new Promise<String[]>((resolve: Function, reject: Function) => {
    conn.query("SELECT Product2.enxCPQ__TECH_External_Id__c, CurrencyIsoCode FROM PricebookEntry WHERE (Product2.Name IN (" + Util.setToIdString(productList) + ") OR Product2.enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(productList) + ")) AND (IsActive = true OR Pricebook2.IsStandard = true)", 
    null,
    function (err, res) {
        if (err) reject('error retrieving pricebook entry currencies: ' + err);
        Util.log("--- pricebook entry currencies: " + res.records.length);
        resolve(res.records);
    });
})
}

    public static async queryPricebooks(conn: core.Connection): Promise<String[]> {
        Util.log('--- exporting pricebooks');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT IsStandard, Name, IsActive, Description, enxCPQ__Master__c, enxCPQ__Reference_Master_field__c, enxCPQ__TECH_External_Id__c, enxCPQ__Use_UnitPrice__c, enxCPQ__Valid_From__c, enxCPQ__Valid_To__c FROM Pricebook2 WHERE IsActive = true OR IsStandard = true", 
        null,
        function (err, res) {
            if (err) reject('error retrieving pricebooks: ' + err);
            Util.log("--- pricebooks: " + res.records.length);
            resolve(res.records);
        });
    })
    }
    public static async queryPricebookEntries(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting pbe');
        let queryString = this.isB2B
        ? "SELECT Product2.enxCPQ__TECH_External_Id__c, Pricebook2.enxCPQ__TECH_External_Id__c, IsActive, enxCPQ__Charge_List_Price__c, CurrencyIsoCode, enxCPQ__Current_Pricebook_Inventory__c, enxCPQ__Current_Pricebook_Lead_Time__c, UnitPrice, enxCPQ__MRC_List__c, enxB2B__MRC_List__c, enxCPQ__OTC_List__c, enxB2B__OTC_List__c, Pricebook2Id, enxCPQ__Price_Modifier_Amount__c, enxCPQ__Price_Modifier_Percent__c, enxCPQ__Price_Override__c, Product2Id, enxB2B__Service_Capex__c, UseStandardPrice FROM PricebookEntry WHERE (Product2.Name IN ("
        : "SELECT Product2.enxCPQ__TECH_External_Id__c, Pricebook2.enxCPQ__TECH_External_Id__c, IsActive, enxCPQ__Charge_List_Price__c, CurrencyIsoCode, enxCPQ__Current_Pricebook_Inventory__c, enxCPQ__Current_Pricebook_Lead_Time__c, UnitPrice, enxCPQ__MRC_List__c, enxCPQ__OTC_List__c, Pricebook2Id, enxCPQ__Price_Modifier_Amount__c, enxCPQ__Price_Modifier_Percent__c, enxCPQ__Price_Override__c, Product2Id, UseStandardPrice FROM PricebookEntry WHERE (Product2.Name IN (";
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query(queryString + Util.setToIdString(productList) + ") OR Product2.enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(productList) + ")) AND Pricebook2.IsStandard = false AND Product2.RecordType.Name != 'Charge Element' AND IsActive = true", 
        null,
        function (err, res) {
            if (err) reject('error retrieving pricebook entries: ' + err);
            Util.log("--- pricebook entries: " + res.records.length);
            resolve(res.records);
        });
    })
    }
    public static async queryProduct(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting product');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
            conn.query("SELECT Name, IsActive, enxCPQ__Billing_Frequency__c, enxCPQ__Category__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Criteria__c, enxCPQ__Charge_Item_Action__c, enxCPQ__Charge_Model__c, enxCPQ__Charge_Name__c, enxCPQ__Charge_Type__c, enxCPQ__Column_Dimension__c, enxCPQ__Column_Value__c, enxCPQ__Current_Inventory__c, enxCPQ__Current_Lead_Time__c, enxCPQ__Description_DE__c, enxCPQ__Description_EN__c, enxCPQ__Description_ES__c, enxCPQ__Description_FR__c, enxCPQ__Description_IT__c, enxCPQ__Description_Pattern__c, enxCPQ__Description_PL__c, enxCPQ__Hide_in_Product_Catalogue__c, enxCPQ__Ignore_Inventory_Management__c, enxCPQ__Ignore_Option_Requirement__c, enxCPQ__Pricing_Method__c, enxCPQ__Row_Dimension__c, enxCPQ__Row_Value__c, enxCPQ__Multiplier_Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Multiplier_Field__c, enxCPQ__Name_DE__c, enxCPQ__Name_EN__c, enxCPQ__Name_ES__c, enxCPQ__Name_FR__c, enxCPQ__Name_IT__c, enxCPQ__Name_PL__c, ProductCode, Description, Family, enxCPQ__Product_Lifecycle_Version__c,enxCPQ__TECH_Bundle_Element__c, enxCPQ__TECH_Definition_Id__c, enxCPQ__TECH_External_Id__c,enxCPQ__TECH_Is_Configurable__c, enxCPQ__TECH_Option_JSON__c, enxCPQ__Unit_of_Measure__c, enxCPQ__Value_From__c, enxCPQ__Value_To__c,enxCPQ__Parent_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Parent__r.enxCPQ__TECH_External_Id__c, enxCPQ__Save_Before_Calculation__c,  RecordType.Name, enxCPQ__Dimension_1__c, enxCPQ__Dimension_1_Numeric__c, enxCPQ__Dimension_2__c, enxCPQ__Dimension_2_Numeric__c, enxCPQ__Dimension_3__c, enxCPQ__Dimension_3_Numeric__c, enxCPQ__Dimension_4__c, enxCPQ__Dimension_4_Numeric__c, enxCPQ__Dimension_5__c, enxCPQ__Dimension_5_Numeric__c, enxCPQ__Sorting_Order__c FROM Product2 WHERE Name IN (" + Util.setToIdString(productList) + ")", 
            null,
            function (err, res) {
                if (err) {reject('Failed to retrieve product: ' + productList + '. Error: ' + err)};
                if(res.records.length === 0) {reject('Failed to retrieve products. Check if every product exist on source env')};
                resolve(res.records);
            });
        });
    }

    public static async queryProductAttributes(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting product attributes ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
            conn.query("SELECT Name, enxCPQ__Active__c, enxCPQ__Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Attribute_Set__r.enxCPQ__TECH_External_Id__c, enxCPQ__Option_Affecting__c, enxCPQ__Order__c, enxCPQ__Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Product_Field_to_Update__c, RecordType.Name, enxCPQ__Role__c, enxCPQ__TECH_External_Id__c, enxCPQ__Value_Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Value_Boolean__c, enxCPQ__Value_Currency__c, enxCPQ__Value_Date__c, enxCPQ__Value_Number__c, enxCPQ__Value_Percent__c, enxCPQ__Value_Text_Long__c, enxCPQ__Value_Text_Short__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c FROM enxCPQ__ProductAttribute__c WHERE enxCPQ__Product__r.Name IN (" + Util.setToIdString(productList) + ") ORDER BY enxCPQ__Order__c", 
            null,
            function (err, res) {
                if (err) reject('Failed to retrieve product attributes:  Error: ' + err);
                resolve(res.records);
            });
        });
    }
    public static async queryProductOptions(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting product options ');

        return new Promise<String[]>((resolve: Function, reject: Function) => {
            conn.query("SELECT Name, IsActive, enxCPQ__Billing_Frequency__c, enxCPQ__Category__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Criteria__c, enxCPQ__Charge_Item_Action__c, enxCPQ__Charge_Model__c, enxCPQ__Charge_Name__c, enxCPQ__Charge_Type__c, enxCPQ__Column_Dimension__c, enxCPQ__Column_Value__c, enxCPQ__Current_Inventory__c, enxCPQ__Current_Lead_Time__c, enxCPQ__Description_DE__c, enxCPQ__Description_EN__c, enxCPQ__Description_ES__c, enxCPQ__Description_FR__c, enxCPQ__Description_IT__c, enxCPQ__Description_Pattern__c, enxCPQ__Description_PL__c, enxCPQ__Hide_in_Product_Catalogue__c, enxCPQ__Ignore_Inventory_Management__c, enxCPQ__Ignore_Option_Requirement__c, enxCPQ__Pricing_Method__c, enxCPQ__Row_Dimension__c, enxCPQ__Row_Value__c, enxCPQ__Multiplier_Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Multiplier_Field__c, enxCPQ__Name_DE__c, enxCPQ__Name_EN__c, enxCPQ__Name_ES__c, enxCPQ__Name_FR__c, enxCPQ__Name_IT__c, enxCPQ__Name_PL__c, ProductCode, Description, Family, enxCPQ__Product_Lifecycle_Version__c,enxCPQ__TECH_Bundle_Element__c, enxCPQ__TECH_Definition_Id__c, enxCPQ__TECH_External_Id__c,enxCPQ__TECH_Is_Configurable__c, enxCPQ__TECH_Option_JSON__c, enxCPQ__Unit_of_Measure__c, enxCPQ__Value_From__c, enxCPQ__Value_To__c, enxCPQ__Parent_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Parent__r.enxCPQ__TECH_External_Id__c, enxCPQ__Save_Before_Calculation__c, RecordType.Name, enxCPQ__Dimension_1__c, enxCPQ__Dimension_1_Numeric__c, enxCPQ__Dimension_2__c, enxCPQ__Dimension_2_Numeric__c, enxCPQ__Dimension_3__c, enxCPQ__Dimension_3_Numeric__c, enxCPQ__Dimension_4__c, enxCPQ__Dimension_4_Numeric__c, enxCPQ__Dimension_5__c, enxCPQ__Dimension_5_Numeric__c FROM Product2 WHERE RecordType.Name = 'Option' AND enxCPQ__Parent_Product__r.Name IN (" + Util.setToIdString(productList) + ") ORDER BY enxCPQ__Sorting_Order__c", 
            null,
            function (err, res) {
                if (err) reject('Failed to retrieve options. Error: ' + err);
                resolve(res.records);
            });
        });
    }

    public static async queryAttributeSetAttributes(conn: core.Connection, attributeSetIds: Set<String>): Promise<String[]> {
        Util.log('--- exporting attributes set attributes ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
            conn.query("SELECT Name, enxCPQ__Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Attribute_Set__r.enxCPQ__TECH_External_Id__c, enxCPQ__Order__c, enxCPQ__TECH_External_Id__c FROM enxCPQ__AttributeSetAttribute__c ORDER BY enxCPQ__Order__c ", 
            null,
            function (err, res) {
                if (err) reject('Failed to retrieve attribute set attributes. Error: ' + err);
                if( attributeSetIds.size === 0) resolve("");
                resolve(res.records);
            });

        });
    }

    public static async queryAttributes(conn: core.Connection, attributeIds: Set<String>): Promise<String[]> {
        Util.log('--- exporting attributes - ' + attributeIds.size);
        if(attributeIds.size === 0){
            return;
        }
        return new Promise<String[]>((resolve: Function, reject: Function) => {

            conn.query("SELECT Name, enxCPQ__Active__c, enxCPQ__Decimal_Places__c, enxCPQ__Description__c, enxCPQ__Description_DE__c, enxCPQ__Description_EN__c, enxCPQ__Description_ES__c, enxCPQ__Description_FR__c, enxCPQ__Description_IT__c, enxCPQ__Description_PL__c, enxCPQ__Display_Disabled__c,enxCPQ__Display_in_Configurator__c, enxCPQ__Display_not_for_Item_Action__c, enxCPQ__Display_not_for_Profile__c, enxCPQ__Display_not_on_Quote_Stage__c, enxCPQ__Display_on_Configuration_Description__c, enxCPQ__Editable_not_for_Item_Action__c, enxCPQ__Editable_not_for_Profile__c, enxCPQ__Editable_not_on_Quote_Stage__c, enxCPQ__Helptext__c, enxCPQ__Item_Field_Type__c, enxCPQ__Lookup_Field__c, enxCPQ__Lookup_Field_Query__c, enxCPQ__Lookup_Filters__c, enxCPQ__Lookup_Object__c, enxCPQ__Name_DE__c, enxCPQ__Name_EN__c, enxCPQ__Name_ES__c, enxCPQ__Name_FR__c, enxCPQ__Name_IT__c, enxCPQ__Name_PL__c, enxCPQ__Product_Field_to_Update__c, enxCPQ__Required__c, enxCPQ__Required_on_Quote_Stage__c, enxCPQ__Source_Field_Cart__c, enxCPQ__Source_Field__c, enxCPQ__TECH_Definition_Id__c, enxCPQ__Type__c, enxCPQ__TECH_External_Id__c FROM enxCPQ__Attribute__c WHERE enxCPQ__TECH_External_Id__c IN (" + Util.setToIdString(attributeIds) + ") ", 
            null,
            function (err, res) {
                if (err) reject('Failed to retrieve attributes. Error: ' + err);
                resolve(res.records);
            });
        });
    }


    public static async queryProvisioningTasks(conn: core.Connection): Promise<String[]> {
        Util.log('--- exporting provisioning tasks ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Name, enxB2B__Apex_handler_reference__c, enxB2B__Automated_Task_Type__c, enxB2B__Description__c, enxB2B__TECH_External_Id__c, enxB2B__Type__c  FROM enxB2B__ProvisioningTask__c",null, function(err, res) {
            if (err) reject('error retrieving provisioning tasks: ' + err);
            Util.log("--- provisioning tasks: " + res.records.length);
            resolve(res.records);
        });
    });
}

    public static async queryProvisioningPlans(conn: core.Connection): Promise<String[]> {
        Util.log('--- exporting provisioning plans');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Name, enxB2B__Support_Plan__c, enxB2B__TECH_External_Id__c FROM enxB2B__ProvisioningPlan__c", null, function(err, res) {
            if (err) reject('error retrieving provisioning plans: ' + err);
            Util.log("--- provisioning plans: " + res.records.length);
            resolve(res.records);
        });
    });
}
    public static async  queryProductCharges(conn: core.Connection, productList: Set<String>): Promise<String[]> {
         Util.log('--- exporting product charges ');
         return new Promise<String[]>((resolve: Function, reject: Function) => {

         conn.query("SELECT Name, IsActive, enxCPQ__Billing_Frequency__c, enxCPQ__Category__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Criteria__c, enxCPQ__Charge_Item_Action__c, enxCPQ__Charge_Model__c, enxCPQ__Charge_Name__c, enxCPQ__Charge_Type__c, enxCPQ__Column_Dimension__c, enxCPQ__Column_Value__c, enxCPQ__Current_Inventory__c, enxCPQ__Current_Lead_Time__c, enxCPQ__Description_DE__c, enxCPQ__Description_EN__c, enxCPQ__Description_ES__c, enxCPQ__Description_FR__c, enxCPQ__Description_IT__c, enxCPQ__Description_Pattern__c, enxCPQ__Description_PL__c, enxCPQ__Hide_in_Product_Catalogue__c, enxCPQ__Ignore_Inventory_Management__c, enxCPQ__Ignore_Option_Requirement__c, enxCPQ__Pricing_Method__c, enxCPQ__Row_Dimension__c, enxCPQ__Row_Value__c, enxCPQ__Multiplier_Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Multiplier_Field__c, enxCPQ__Name_DE__c, enxCPQ__Name_EN__c, enxCPQ__Name_ES__c, enxCPQ__Name_FR__c, enxCPQ__Name_IT__c, enxCPQ__Name_PL__c, ProductCode, Description, Family, enxCPQ__Product_Lifecycle_Version__c,enxCPQ__TECH_Bundle_Element__c, enxCPQ__TECH_Definition_Id__c, enxCPQ__TECH_External_Id__c,enxCPQ__TECH_Is_Configurable__c, enxCPQ__TECH_Option_JSON__c, enxCPQ__Unit_of_Measure__c, enxCPQ__Value_From__c, enxCPQ__Value_To__c, enxCPQ__Parent_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Parent__r.enxCPQ__TECH_External_Id__c, enxCPQ__Save_Before_Calculation__c, RecordType.Name, enxCPQ__Dimension_1__c, enxCPQ__Dimension_1_Numeric__c, enxCPQ__Dimension_2__c, enxCPQ__Dimension_2_Numeric__c, enxCPQ__Dimension_3__c, enxCPQ__Dimension_3_Numeric__c, enxCPQ__Dimension_4__c, enxCPQ__Dimension_4_Numeric__c, enxCPQ__Dimension_5__c, enxCPQ__Dimension_5_Numeric__c FROM Product2 WHERE RecordType.Name = 'Charge' AND (enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(productList) + ") OR enxCPQ__Charge_Reference__c !=null)  ORDER BY enxCPQ__Sorting_Order__c", 
         null,
         function (err, res) {
            if (err) reject('Failed to retrieve charges error: ' + err);
            Util.log('fin charges');
            resolve(res.records);
        });
    });
}

public static async  queryProductChargesIds(conn: core.Connection, productList: Set<String>): Promise<String[]> {
    Util.log('--- exporting product charges ids');
    return new Promise<String[]>((resolve: Function, reject: Function) => {

    conn.query("SELECT enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__TECH_External_Id__c FROM Product2 WHERE RecordType.Name = 'Charge' AND enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(productList) + ") ORDER BY enxCPQ__Sorting_Order__c", 
    null,
    function (err, res) {
       if (err) reject('Failed to retrieve charges ids. Error: ' + err);
       Util.log('fin charges ids');
       resolve(res.records);
   });
});
}
    public static async queryProductAttributeValues(conn: core.Connection, productList: Set<String>): Promise<String[]> {
       Util.log('--- exporting product attribute values ');
       return new Promise<String[]>((resolve: Function, reject: Function) => {

           conn.query("SELECT Name, enxCPQ__Active__c, enxCPQ__Exclusive_for_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Name_DE__c, enxCPQ__Name_EN__c, enxCPQ__Name_ES__c, enxCPQ__Name_FR__c, enxCPQ__Name_IT__c, enxCPQ__Name_PL__c, enxCPQ__Order__c, enxCPQ__TECH_External_Id__c, enxCPQ__TECH_Definition_Id__c FROM enxCPQ__AttributeValue__c WHERE enxCPQ__Global__c = false AND enxCPQ__Exclusive_for_Product__r.Name IN (" + Util.setToIdString(productList) + ") ORDER BY enxCPQ__Order__c", 
           null,
           function (err, res) {
               if (err) reject('Failed to retrieve product attribute values. Error: ' + err);
               resolve(res.records);
           });
       });
}

public static async queryAttributeDefaultValues(conn: core.Connection, productList: Set<String>): Promise<String[]> {
    Util.log('--- exporting attribute default values ');
    return new Promise<String[]>((resolve: Function, reject: Function) => {

        conn.query("SELECT enxCPQ__Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Attribute_Value__r.enxCPQ__TECH_External_Id__c, enxCPQ__Attribute_Value_Text__c, enxCPQ__Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__TECH_External_Id__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c FROM enxCPQ__AttributeDefaultValue__c WHERE enxCPQ__Product__r.Name IN (" + Util.setToIdString(productList) + ") ORDER BY enxCPQ__TECH_External_Id__c", 
        null,
        function (err, res) {
            if (err) reject('Failed to retrieve attribute default values. Error: ' + err);
            resolve(res.records);
        });
    });
}

public static async queryProductRelationships(conn: core.Connection, productList: Set<String>): Promise<String[]> {
    Util.log('--- exporting product relationships ');
    return new Promise<String[]>((resolve: Function, reject: Function) => {

        conn.query("SELECT Name, enxCPQ__Max_Occurrences__c, enxCPQ__Min_Occurrences__c, enxCPQ__Primary_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Relationship_Type__c, enxCPQ__Secondary_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__TECH_External_Id__c FROM enxCPQ__ProductRelationship__c WHERE enxCPQ__Primary_Product__r.Name IN (" + Util.setToIdString(productList) + ") AND enxCPQ__Secondary_Product__c != null", 
        null,
        function (err, res) {
            if (err) reject('Failed to retrieve product relationships. Error: ' + err);
            resolve(res.records);
        });
    });
}


public static async queryAttributeValueDependencies(conn: core.Connection, productList: Set<String>): Promise<String[]> {
    Util.log('--- exporting attribute value dependency ');
    return new Promise<String[]>((resolve: Function, reject: Function) => {

        conn.query("SELECT enxCPQ__Dependent_Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Dependent_Value__r.enxCPQ__TECH_External_Id__c, enxCPQ__Execution_Order__c, enxCPQ__Master_Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Master_Value__r.enxCPQ__TECH_External_Id__c, enxCPQ__Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__TECH_Definition_Id__c, enxCPQ__TECH_External_Id__c, enxCPQ__TECH_Key__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Master_Product__r.enxCPQ__TECH_External_Id__c FROM enxCPQ__AttributeValueDependency__c WHERE enxCPQ__Product__r.Name IN (" + Util.setToIdString(productList) + ") ORDER BY enxCPQ__TECH_External_Id__c", 
        null,
        function (err, res) {
            if (err) reject('Failed to retrieve attribute value dependency. Error: ' + err);
            resolve(res.records);
        });
    });
}
    public static async queryAttributeRules(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting attribute rules ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {

            conn.query("SELECT enxCPQ__Active__c, enxCPQ__Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Error_Message__c, enxCPQ__Order__c, enxCPQ__Product__r.enxCPQ__TECH_External_Id__c, RecordType.Name, enxCPQ__Regexp__c, enxCPQ__Rule_Attribute_Update_Logic__c, enxCPQ__Rule_Criteria__c, enxCPQ__TECH_External_Id__c, enxCPQ__Validation_Type__c, enxCPQ__Value_From__c, enxCPQ__Value_To__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c FROM enxCPQ__AttributeRule__c WHERE enxCPQ__Product__r.Name IN (" + Util.setToIdString(productList) + ") ORDER BY enxCPQ__Order__c", 
            null,
            function (err, res) {
                if (err) reject('Failed to retrieve attribute rules. Error: ' + err);
                resolve(res.records);
            });
        });
    }

    public static async queryProvisioningPlanAssigns(conn: core.Connection, productList: Set<String>): Promise<String[]> {
        Util.log('--- exporting provisioning plan assignments ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {

            conn.query("SELECT enxB2B__Active__c, enxB2B__Criteria__c, enxB2B__Item_Action__c, enxB2B__Order__c, enxB2B__Product__r.enxCPQ__TECH_External_Id__c, enxB2B__Provisioning_Plan__r.enxB2B__TECH_External_Id__c, enxB2B__TECH_External_ID__c FROM enxB2B__ProvisioningPlanAssignment__c WHERE enxB2B__Product__r.Name IN (" + Util.setToIdString(productList) + ") ORDER BY enxB2B__Order__c", 
            null,
            function (err, res) {
                if (err) reject('Failed to retrieve provisioning plan assignments Error: ' + err);
                resolve(res.records);
            });
        });
    }

    public static async queryCategories(conn: core.Connection, categoryIds: Set<String>): Promise<String[]> {
        Util.log('--- exporting categories - ' + categoryIds.size);
        if(categoryIds.size ===0){
            return;
        }
        return new Promise<String[]>((resolve: Function, reject: Function) => {

            conn.query("SELECT Name, enxCPQ__TECH_Definition_Id__c, enxCPQ__TECH_External_Id__c, enxCPQ__Parameter_Attribute_Set__r.enxCPQ__TECH_External_Id__c, enxCPQ__Parent_Category__r.enxCPQ__TECH_External_Id__c FROM enxCPQ__Category__c WHERE enxCPQ__TECH_External_Id__c IN (" + Util.setToIdString(categoryIds) + ") ", 
            null,
            function (err, res) {
                if (err) reject('Failed to retrieve categories. Error: ' + err);
                resolve(res.records);
            });
        });
    }

    public static async queryAttributeValues(conn: core.Connection, attributeIds: Set<String>): Promise<String[]> {
        Util.log('--- exporting product attribute values ');
        if(attributeIds.size === 0){
            return;
        }
        return new Promise<String[]>((resolve: Function, reject: Function) => {

            conn.query("SELECT Name, enxCPQ__Active__c, enxCPQ__Exclusive_for_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Name_DE__c, enxCPQ__Name_EN__c, enxCPQ__Name_ES__c, enxCPQ__Name_FR__c, enxCPQ__Name_IT__c, enxCPQ__Name_PL__c, enxCPQ__Order__c, enxCPQ__TECH_External_Id__c, enxCPQ__TECH_Definition_Id__c FROM enxCPQ__AttributeValue__c WHERE enxCPQ__Global__c = true AND enxCPQ__Attribute__r.enxCPQ__TECH_External_Id__c IN (" + Util.setToIdString(attributeIds) + ") ORDER BY enxCPQ__Order__c", 
            null,
            function (err, res) {
                if (err) reject('Failed to retrieve product attribute values: ' + attributeIds + '. Error: ' + err);
                resolve(res.records);
            });
        });
    }
    public static async queryAttributeSets(conn: core.Connection, attributeSetIds: Set<String>): Promise<String[]> {
        Util.log('--- exporting attributes sets - ' + attributeSetIds.size);
        return new Promise<String[]>((resolve: Function, reject: Function) => {
            
            conn.query("SELECT Name, enxCPQ__Description__c, enxCPQ__TECH_Definition_Id__c, enxCPQ__TECH_External_Id__c FROM enxCPQ__AttributeSet__c ", 
            null,
            function (err, res) {
                if (err) reject('Failed to retrieve attribute sets. Error: ' + err);
                if( attributeSetIds.size === 0) resolve("");
                resolve(res.records);
            });

        });
    }
    public static async queryProvisioningPlanAssignmentIds (conn: core.Connection): Promise<String[]> {
        Util.log('--- exporting Provisioning Plan Assignment Ids ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Id FROM enxB2B__ProvisioningPlanAssignment__c",
        null,
        function(err, res) {
            if (err) reject('error retrieving provisioning plan assigment ids: ' + err);

            resolve(res.records);
        });
    });
    }
    public static async queryProvisioningTaskAssignmentIds (conn: core.Connection): Promise<String[]> {
        Util.log('--- exporting provisioning task assigment ids ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Id FROM enxB2B__ProvisioningTaskAssignment__c",
        null,
        function(err, res) {
            if (err) reject('error retrieving provisioning task assigment ids: ' + err);
     
            resolve(res.records);
        });
    });
    }

    public static async queryProvisioningTaskAssignments (conn: core.Connection): Promise<String[]> {
        Util.log('--- exporting Provisioning task assignments');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT enxB2B__Criteria__c, enxB2B__Order__c, enxB2B__Predecessors__c, enxB2B__Provisioning_Plan__r.enxB2B__TECH_External_Id__c, enxB2B__Provisioning_Task__r.enxB2B__TECH_External_Id__c, enxB2B__TECH_External_ID__c FROM enxB2B__ProvisioningTaskAssignment__c",
        null,
        function(err, res) {
            if (err) reject('error retrieving provisioning task assignments: ' + err);

            resolve(res.records);
        });
    });
    }
    public static async queryPriceRules (conn: core.Connection): Promise<String[]> {
        Util.log('--- exporting  price rules ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Name, RecordType.Name, enxCPQ__Account__r.enxCPQ__TECH_External_Id__c, enxCPQ__Active__c, enxCPQ__Conditions_Logic__c, enxCPQ__Order__c, enxCPQ__Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__TECH_External_Id__c, enxCPQ__Tier_Field__c FROM enxCPQ__PriceRule__c", 
        null,
        function(err, res) {
            if (err) reject('error retrieving price rules: ' + err);

            resolve(res.records);
        });
    });
    }
    public static async queryPriceRuleConditions (conn: core.Connection): Promise<String[]>  {
        Util.log('--- exporting price rule conditions ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Name, enxCPQ__Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Field_Name__c, enxCPQ__Operator__c, enxCPQ__Order__c, enxCPQ__Price_Rule__r.enxCPQ__TECH_External_Id__c, enxCPQ__TECH_External_Id__c, enxCPQ__Value__c FROM enxCPQ__PriceRuleCondition__c", 
        null,
        function(err, res) {
            if (err) reject('error retrieving price rule conditions: ' + err);
            
            resolve(res.records);
        });
    });
    }
    public static async queryPriceRuleActions (conn: core.Connection): Promise<String[]>  {
        Util.log('--- exporting Price Rules ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query("SELECT Name, enxCPQ__Action_Type__c, enxCPQ__Charge__r.enxCPQ__TECH_External_Id__c, enxCPQ__Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Field_Name__c, enxCPQ__Order__c, enxCPQ__Price_Rule__r.enxCPQ__TECH_External_Id__c, enxCPQ__Target_Field_Name__c, enxCPQ__Target_Value__c, enxCPQ__TECH_External_Id__c, enxCPQ__Tier_Value_From__c, enxCPQ__Tier_Value_To__c FROM enxCPQ__PriceRuleAction__c", 
        null,
        function(err, res) {
            if (err) reject('error retrieving price rule actions: ' + err);
            
            resolve(res.records);
        });
    })    
    }
    public static async queryChargeElementStdPricebookEntries (conn: core.Connection, productList: Set<String>): Promise<String[]> {
        let queryString = this.isB2B
        ? "SELECT Product2.enxCPQ__TECH_External_Id__c, Pricebook2.enxCPQ__TECH_External_Id__c, IsActive, enxCPQ__Charge_List_Price__c, CurrencyIsoCode, enxCPQ__Current_Pricebook_Inventory__c, enxCPQ__Current_Pricebook_Lead_Time__c, UnitPrice, enxCPQ__MRC_List__c, enxB2B__MRC_List__c, enxCPQ__OTC_List__c, enxB2B__OTC_List__c, Pricebook2Id, Product2Id, enxB2B__Service_Capex__c, UseStandardPrice FROM PricebookEntry WHERE Product2.enxCPQ__Root_Product__r.Name IN ("
        : "SELECT Product2.enxCPQ__TECH_External_Id__c, Pricebook2.enxCPQ__TECH_External_Id__c, IsActive, enxCPQ__Charge_List_Price__c, CurrencyIsoCode, enxCPQ__Current_Pricebook_Inventory__c, enxCPQ__Current_Pricebook_Lead_Time__c, UnitPrice, enxCPQ__MRC_List__c, enxCPQ__OTC_List__c, Pricebook2Id, Product2Id, UseStandardPrice FROM PricebookEntry WHERE Product2.enxCPQ__Root_Product__r.Name IN ("
        Util.log('--- exporting Charge Elements Std Entries ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query(queryString + Util.setToIdString(productList) + ") AND Pricebook2.IsStandard = true AND Product2.RecordType.Name = 'Charge Element' AND IsActive = true", 
        null,
        function(err, res) {
            if (err) reject('error retrieving Charge Elements Std Entries: ' + err);
            
            resolve(res.records);
        });
    })    
    }

    public static async queryChargeElementPricebookEntries (conn: core.Connection, productList: Set<String>): Promise<String[]> {
        let queryString = this.isB2B 
        ? "SELECT Product2.enxCPQ__TECH_External_Id__c, Pricebook2.enxCPQ__TECH_External_Id__c, IsActive, enxCPQ__Charge_List_Price__c, CurrencyIsoCode, enxCPQ__Current_Pricebook_Inventory__c, enxCPQ__Current_Pricebook_Lead_Time__c, UnitPrice, enxCPQ__MRC_List__c, enxB2B__MRC_List__c, enxCPQ__OTC_List__c, enxB2B__OTC_List__c, Pricebook2Id, Product2Id, enxB2B__Service_Capex__c, UseStandardPrice FROM PricebookEntry WHERE Product2.enxCPQ__Root_Product__r.Name IN ("
        : "SELECT Product2.enxCPQ__TECH_External_Id__c, Pricebook2.enxCPQ__TECH_External_Id__c, IsActive, enxCPQ__Charge_List_Price__c, CurrencyIsoCode, enxCPQ__Current_Pricebook_Inventory__c, enxCPQ__Current_Pricebook_Lead_Time__c, UnitPrice, enxCPQ__MRC_List__c, enxCPQ__OTC_List__c, Pricebook2Id, Product2Id, UseStandardPrice FROM PricebookEntry WHERE Product2.enxCPQ__Root_Product__r.Name IN ("
        Util.showSpinner('--- exporting Charge Element Pricebook Entries');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        conn.query(queryString + Util.setToIdString(productList) + ") AND Pricebook2.IsStandard = false AND Product2.RecordType.Name = 'Charge Element' AND IsActive = true", 
        null,
        function(err, res) {
            if (err) reject('error retrieving Charge Element Pricebook Entries: ' + err);
            Util.hideSpinner('Charge Element Pricebook Entries export done');
            resolve(res.records);
        });
    })    
    }
    public static async bulkQueryChargeElementStdPricebookEntries (conn: core.Connection, productList: String): Promise<String[]> {
        Util.log('--- exporting charge element std pricebook entries ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        var records = []; 
        conn.bulk.query("SELECT Pricebook2.enxCPQ__TECH_External_Id__c, IsActive, enxCPQ__Charge_List_Price__c, CurrencyIsoCode, enxCPQ__Current_Pricebook_Inventory__c, enxCPQ__Current_Pricebook_Lead_Time__c, UnitPrice, enxCPQ__MRC_List__c, enxB2B__MRC_List__c, enxCPQ__OTC_List__c, enxB2B__OTC_List__c, Pricebook2Id, Product2Id, enxB2B__Service_Capex__c, UseStandardPrice FROM PricebookEntry WHERE Product2.enxCPQ__Root_Product__r.Name IN (" + productList + ") AND Pricebook2.IsStandard = true AND Product2.RecordType.Name = 'Charge Element' AND IsActive = true")
            .on('record', function(rec) { 
                if (records.length % 100 == 0) {
                    process.stdout.write("--- querying charge element std pricebook entries. Retrieved: " + records.length + " records\r");
                }
                records.push(rec);
            })
            .on('error', function(err) { 
                reject('error retrieving charge element std pricebook entries ' + err); 
            })
            .on('end', function(info) { 
                Util.log("--- charge element std pricebook entries: " + records.length + "        ");
                resolve(records); 
                
            });
    })
    }
    // FIELDS removed from query because they were putting "0" instead of null -> enxCPQ__Price_Modifier_Amount__c, enxCPQ__Price_Modifier_Percent__c, enxCPQ__Price_Override__c
    public static async bulkQueryChargeElementPricebookEntries (conn: core.Connection, productList: String): Promise<String[]> {
        Util.log('--- exporting Charge Element Pricebook Entries ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        var records = []; 
        conn.bulk.query("SELECT Pricebook2.enxCPQ__TECH_External_Id__c, IsActive, enxCPQ__Charge_List_Price__c, CurrencyIsoCode, enxCPQ__Current_Pricebook_Inventory__c, enxCPQ__Current_Pricebook_Lead_Time__c, UnitPrice, enxCPQ__MRC_List__c, enxB2B__MRC_List__c, enxCPQ__OTC_List__c, enxB2B__OTC_List__c, Pricebook2Id, Product2Id, enxB2B__Service_Capex__c, UseStandardPrice FROM PricebookEntry WHERE Product2.enxCPQ__Root_Product__r.Name IN (" + productList + ") AND Pricebook2.IsStandard = false AND Product2.RecordType.Name = 'Charge Element' AND IsActive = true")
            .on('record', function(rec) { 
                if (records.length % 100 == 0) {
                    process.stdout.write("--- querying charge element pricebook entries. Retrieved: " + records.length + " records\r");
                }
                records.push(rec);
            })
            .on('error', function(err) { 
                reject('error retrieving charge element pricebook entries ' + err); 
            })
            .on('end', function(info) { 
                Util.log("--- charge element pricebook entries: " + records.length + "                                ");
                resolve(records);           
            });
    })
    }
    public static async bulkQueryChargeElements (conn: core.Connection, productName: String, chargeName: String): Promise<String[]> {
        Util.log('--- exporting charge elements ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        var records = []; 
        conn.bulk.query("SELECT Name, IsActive, enxCPQ__Billing_Frequency__c, enxCPQ__Category__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Criteria__c, enxCPQ__Charge_Item_Action__c, enxCPQ__Charge_Model__c, enxCPQ__Charge_Name__c, enxCPQ__Charge_Type__c, enxCPQ__Current_Inventory__c, enxCPQ__Current_Lead_Time__c, enxCPQ__Description_DE__c, enxCPQ__Description_EN__c, enxCPQ__Description_ES__c, enxCPQ__Description_FR__c, enxCPQ__Description_IT__c, enxCPQ__Description_Pattern__c, enxCPQ__Description_PL__c, enxCPQ__Hide_in_Product_Catalogue__c, enxCPQ__Ignore_Inventory_Management__c, enxCPQ__Ignore_Option_Requirement__c, enxCPQ__Multiplier_Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Multiplier_Field__c, enxCPQ__Name_DE__c, enxCPQ__Name_EN__c, enxCPQ__Name_ES__c, enxCPQ__Name_FR__c, enxCPQ__Name_IT__c, enxCPQ__Name_PL__c, ProductCode, Description, Family, enxCPQ__Product_Lifecycle_Version__c,enxCPQ__TECH_Bundle_Element__c, enxCPQ__TECH_Definition_Id__c, enxCPQ__TECH_External_Id__c,enxCPQ__TECH_Is_Configurable__c, enxCPQ__TECH_Option_JSON__c, enxCPQ__Unit_of_Measure__c, enxCPQ__Value_From__c, enxCPQ__Value_To__c,enxCPQ__Parent_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Parent__r.enxCPQ__TECH_External_Id__c, RecordType.Name, enxCPQ__Column_Value__c, enxCPQ__Row_Value__c, enxCPQ__Dimension_1_Value__c, enxCPQ__Dimension_2_Value__c, enxCPQ__Dimension_3_Value__c,enxCPQ__Dimension_4_Value__c, enxCPQ__Dimension_5_Value__c FROM Product2 WHERE (enxCPQ__Root_Product__r.Name = '" + productName + "' or enxCPQ__Root_Product__r.Name= '" + chargeName + "')AND RecordType.Name = 'Charge Element' AND IsActive = true")
            .on('record', function(rec) { 
                if (records.length % 100 == 0) {
                    Util.log("--- querying charge elements. Retrieved: " + records.length + " records\r");
                }
                records.push(rec);
            })
            .on('error', function(err) { 
                reject('error retrieving charge elements: ' + err); 
            })
            .on('end', function(info) { 
                Util.log("--- charge elements: " + records.length + "                                ");
                resolve(records); 
            });
    })
    }
    public static async queryChargeElements (conn: core.Connection, productList: Set<String>, chargeList: Set<String>): Promise<String[]> {
        Util.showSpinner('--- exporting charge elements ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
            conn.query("SELECT Name, IsActive, enxCPQ__Billing_Frequency__c, enxCPQ__Category__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Criteria__c, enxCPQ__Charge_Item_Action__c, enxCPQ__Charge_Model__c, enxCPQ__Charge_Name__c, enxCPQ__Charge_Type__c, enxCPQ__Current_Inventory__c, enxCPQ__Current_Lead_Time__c, enxCPQ__Description_DE__c, enxCPQ__Description_EN__c, enxCPQ__Description_ES__c, enxCPQ__Description_FR__c, enxCPQ__Description_IT__c, enxCPQ__Description_Pattern__c, enxCPQ__Description_PL__c, enxCPQ__Hide_in_Product_Catalogue__c, enxCPQ__Ignore_Inventory_Management__c, enxCPQ__Ignore_Option_Requirement__c, enxCPQ__Multiplier_Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Multiplier_Field__c, enxCPQ__Name_DE__c, enxCPQ__Name_EN__c, enxCPQ__Name_ES__c, enxCPQ__Name_FR__c, enxCPQ__Name_IT__c, enxCPQ__Name_PL__c, ProductCode, Description, Family, enxCPQ__Product_Lifecycle_Version__c,enxCPQ__TECH_Bundle_Element__c, enxCPQ__TECH_Definition_Id__c, enxCPQ__TECH_External_Id__c,enxCPQ__TECH_Is_Configurable__c, enxCPQ__TECH_Option_JSON__c, enxCPQ__Unit_of_Measure__c, enxCPQ__Value_From__c, enxCPQ__Value_To__c,enxCPQ__Parent_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Parent__r.enxCPQ__TECH_External_Id__c, RecordType.Name, enxCPQ__Column_Value__c, enxCPQ__Row_Value__c, enxCPQ__Dimension_1_Value__c, enxCPQ__Dimension_2_Value__c, enxCPQ__Dimension_3_Value__c,enxCPQ__Dimension_4_Value__c, enxCPQ__Dimension_5_Value__c FROM Product2 WHERE (enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(productList) + ") or enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(chargeList) + "))AND RecordType.Name = 'Charge Element' AND IsActive = true",
            null,
            function(err, res) {
                if (err) reject('error retrieving charge elements: ' + err);
                Util.hideSpinner('charge elements export done')
                resolve(res.records);
            });
        })    
    }

    public static async queryChargeTiers (conn: core.Connection,  productList: Set<String>, chargeList: Set<String>): Promise<String[]> {
        Util.log('--- exporting charge Tiers ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
            conn.query("SELECT Name, IsActive, enxCPQ__Billing_Frequency__c, enxCPQ__Category__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Criteria__c, enxCPQ__Charge_Item_Action__c, enxCPQ__Charge_Model__c, enxCPQ__Charge_Name__c, enxCPQ__Charge_Type__c, enxCPQ__Current_Inventory__c, enxCPQ__Current_Lead_Time__c, enxCPQ__Description_DE__c, enxCPQ__Description_EN__c, enxCPQ__Description_ES__c, enxCPQ__Description_FR__c, enxCPQ__Description_IT__c, enxCPQ__Description_Pattern__c, enxCPQ__Description_PL__c, enxCPQ__Hide_in_Product_Catalogue__c, enxCPQ__Ignore_Inventory_Management__c, enxCPQ__Ignore_Option_Requirement__c, enxCPQ__Multiplier_Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Multiplier_Field__c, enxCPQ__Name_DE__c, enxCPQ__Name_EN__c, enxCPQ__Name_ES__c, enxCPQ__Name_FR__c, enxCPQ__Name_IT__c, enxCPQ__Name_PL__c, ProductCode, Description, Family, enxCPQ__Product_Lifecycle_Version__c,enxCPQ__TECH_Bundle_Element__c, enxCPQ__TECH_Definition_Id__c, enxCPQ__TECH_External_Id__c,enxCPQ__TECH_Is_Configurable__c, enxCPQ__TECH_Option_JSON__c, enxCPQ__Unit_of_Measure__c, enxCPQ__Value_From__c, enxCPQ__Value_To__c,enxCPQ__Parent_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Parent__r.enxCPQ__TECH_External_Id__c, RecordType.Name, enxCPQ__Column_Value__c, enxCPQ__Row_Value__c, enxCPQ__Dimension_1_Value__c, enxCPQ__Dimension_2_Value__c, enxCPQ__Dimension_3_Value__c,enxCPQ__Dimension_4_Value__c, enxCPQ__Dimension_5_Value__c FROM Product2 WHERE (enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(productList) + ") or enxCPQ__Root_Product__r.Name IN (" + Util.setToIdString(chargeList) + "))AND RecordType.Name = 'Charge Tier' AND IsActive = true",
            null,
            function(err, res) {
                if (err) reject('error retrieving charge Tiers: ' + err);
                
                resolve(res.records);
            });
        })    
    }

    public static async bulkQueryChargeTiers (conn: core.Connection, productName: String, chargeName: String): Promise<string> {
        Util.log('--- exporting charge Tiers ');
        return new Promise<string>((resolve: Function, reject: Function) => {
        var records = []; 
        conn.bulk.query("SELECT Name, IsActive, enxCPQ__Billing_Frequency__c, enxCPQ__Category__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Criteria__c, enxCPQ__Charge_Item_Action__c, enxCPQ__Charge_Model__c, enxCPQ__Charge_Name__c, enxCPQ__Charge_Type__c, enxCPQ__Current_Inventory__c, enxCPQ__Current_Lead_Time__c, enxCPQ__Description_DE__c, enxCPQ__Description_EN__c, enxCPQ__Description_ES__c, enxCPQ__Description_FR__c, enxCPQ__Description_IT__c, enxCPQ__Description_Pattern__c, enxCPQ__Description_PL__c, enxCPQ__Hide_in_Product_Catalogue__c, enxCPQ__Ignore_Inventory_Management__c, enxCPQ__Ignore_Option_Requirement__c, enxCPQ__Multiplier_Attribute__r.enxCPQ__TECH_External_Id__c, enxCPQ__Multiplier_Field__c, enxCPQ__Name_DE__c, enxCPQ__Name_EN__c, enxCPQ__Name_ES__c, enxCPQ__Name_FR__c, enxCPQ__Name_IT__c, enxCPQ__Name_PL__c, ProductCode, Description, Family, enxCPQ__Product_Lifecycle_Version__c,enxCPQ__TECH_Bundle_Element__c, enxCPQ__TECH_Definition_Id__c, enxCPQ__TECH_External_Id__c,enxCPQ__TECH_Is_Configurable__c, enxCPQ__TECH_Option_JSON__c, enxCPQ__Unit_of_Measure__c, enxCPQ__Value_From__c, enxCPQ__Value_To__c,enxCPQ__Parent_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Root_Product__r.enxCPQ__TECH_External_Id__c, enxCPQ__Charge_Parent__r.enxCPQ__TECH_External_Id__c, RecordType.Name, enxCPQ__Column_Value__c, enxCPQ__Row_Value__c, enxCPQ__Dimension_1_Value__c, enxCPQ__Dimension_2_Value__c, enxCPQ__Dimension_3_Value__c,enxCPQ__Dimension_4_Value__c, enxCPQ__Dimension_5_Value__c FROM Product2 WHERE (enxCPQ__Root_Product__r.Name = '" + productName + "' or enxCPQ__Root_Product__r.Name= '" + chargeName + "')AND RecordType.Name = 'Charge Tier' AND IsActive = true")
            .on('record', function(rec) { 
                if (records.length % 100 == 0) {
                    Util.log("--- querying charge Tiers. Retrieved: " + records.length + " records\r");
                }
                records.push(rec);
            })
            .on('error', function(err) { 
                reject('error retrieving charge Tiers: ' + err); 
            })
            .on('end', function(info) { 
                Util.log("--- charge Tiers: " + records.length + "                                ");
                resolve(records); 
                
                
            });
    })
    }

    // FIELDS removed from query because they were putting "0" instead of null -> enxCPQ__Price_Modifier_Amount__c, enxCPQ__Price_Modifier_Percent__c, enxCPQ__Price_Override__c
    public static async bulkQueryChargeElementPricebookEntryIds (conn: core.Connection, productName: String): Promise<string> {
        Util.log('--- exporting charge element pricebook entries ids ');
        return new Promise<string>((resolve: Function, reject: Function) => {
        var records = []; 
        conn.bulk.query("SELECT Id FROM PricebookEntry WHERE Product2.RecordType.Name = 'Charge Element' AND Product2.enxCPQ__Root_Product__r.Name = '" + productName + "'")
            .on('record', function(rec) { 
                if (records.length % 100 == 0) {
                    process.stdout.write("--- querying charge element pricebook entries ids. Retrieved: " + records.length + " records\r");
                }
                records.push(rec);
            })
            .on('error', function(err) { 
                reject('error retrieving charge element pricebook entries ' + err); 
            })
            .on('end', function(info) { 
                Util.log("--- charge element pricebook entries ids: " + records.length + "                                ");
                resolve(records); 
            });
    })
    }
    public static async bulkQueryProductIds (conn: core.Connection, productName: String): Promise<String[]> {
        Util.log('--- exporting product ids ');
        return new Promise<String[]>((resolve: Function, reject: Function) => {
        var records = []; 
        conn.bulk.query("SELECT Id, enxCPQ__TECH_External_Id__c FROM Product2 WHERE RecordType.Name = 'Charge Element'  AND enxCPQ__Root_Product__r.Name = '" + productName + "'")
            .on('record', function(rec) { 
                if (records.length % 100 == 0) {
                    process.stdout.write("--- querying product ids. Retrieved: " + records.length + " records\r");
                }
                records.push(rec);
            })
            .on('error', function(err) { 
                reject('error retrieving product ids ' + err); 
            })
            .on('end', function(info) { 
                Util.log("--- querying product ids completed. Retrieved: " + records.length + "                                ");
                resolve(records);
            });
    })
    }
    public static async bulkQueryStdPricebookEntryIds (conn: core.Connection): Promise<string> {
        Util.log('--- exporting std pbe ids ');
        return new Promise<string>((resolve: Function, reject: Function) => {
        var records = []; 
        conn.bulk.query("SELECT Id FROM PricebookEntry WHERE Pricebook2Id != null AND Pricebook2.IsStandard = true AND product2.isactive = true AND Product2.RecordType.Name = 'Charge Element'")
            .on('record', function(rec) { 
                if (records.length % 100 == 0) {
                    Util.log("--- querying std pbe ids. Retrieved: " + records.length + " records\r");
                }
                records.push(rec);
            })
            .on('error', function(err) { 
                reject('error retrieving std pbe ids ' + err);  
            })
            .on('end', function(info) { 
                Util.log("--- querying std pbe ids completed. Retrieved: " + records.length + "                                ");
                resolve(records); 
            });
    })
    }
    public static async bulkQueryPricebookEntryIds (conn: core.Connection): Promise<string> {
        Util.log('--- exporting  pbe ids ');
        return new Promise<string>((resolve: Function, reject: Function) => {
        var records = []; 
        conn.bulk.query("SELECT Id FROM PricebookEntry WHERE Pricebook2Id != null AND Pricebook2.IsStandard = false AND product2.isactive = true AND Product2.RecordType.Name = 'Charge Element'")
            .on('record', function(rec) { 
                if (records.length % 100 == 0) {
                    Util.log("--- querying pbe ids. Retrieved: " + records.length + " records\r");
                }
                records.push(rec);
            })
            .on('error', function(err) { 
                reject(err); 
            })
            .on('end', function(info) { 
                Util.log("--- querying pbe ids completed. Retrieved: " + records.length + "                                ");
                resolve(records); 
            });
    })

}}