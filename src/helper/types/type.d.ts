// types.d.ts
import 'playwright';
// import { Logger } from 'winston';

declare module 'playwright' {
    interface Page {
        logger?: import('winston').Logger;
    }
}
