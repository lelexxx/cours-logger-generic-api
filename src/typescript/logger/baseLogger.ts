import { LoggerLevel } from "./enums/loggerLevel";
import ILogger from "./interfaces/iLogger";

export default abstract class BaseLogger implements ILogger{
    abstract trace<T>(level: LoggerLevel, message: T): void;

    public async callAndTrace<TResult>(action: Promise<TResult>): Promise<TResult>{
        try{
            return await action.then(r => {
                this.trace(LoggerLevel.Information, 'action call with success');

                if(r === null){
                    this.trace(LoggerLevel.Warning, 'action has a nullable result');
                }

                this.trace<TResult>(LoggerLevel.Debug, r);

                return r;
            });
        }
        catch(e){
            this.trace(LoggerLevel.Error, e);
            return null;
        }
    }
}