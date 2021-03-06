import { FileManager } from './../file/FileManager';
import { Connection } from "@salesforce/core";
import { Upsert } from './../repository/Upsert';
import { SettingsSelector } from '../selector/SettingsSelector';

export class SettingsImport {

    private connection:Connection;
    private fileManager:FileManager;

    constructor(targetDirectory:string, connection: Connection) {
        this.fileManager = new FileManager(targetDirectory);
        this.connection = connection;
    }

    public async import() {

        const settings = await this.getSettings();
        
        const settingsSelector = new SettingsSelector();
        const settingsTargetIds = await settingsSelector.getAllSettingIds(this.connection);

        await Upsert.deleteData(this.connection, settingsTargetIds, 'enxCPQ__CPQ_Settings__c');
        await Upsert.insertData(this.connection, settings, 'enxCPQ__CPQ_Settings__c');

    }

    private async getSettings() {
        const settingsInputReader = await this.fileManager.readFile('settings', 'settings.json');
        const settingsString:string = settingsInputReader.toString();
        const settings = JSON.parse(settingsString);
        return settings;
    }

}