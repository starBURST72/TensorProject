import { setupWorker, SetupWorker } from 'msw/browser';
import {handlers} from "./handlers";

const worker: SetupWorker = setupWorker(
    ...handlers
);

export function startWorker(): Promise<void> {
    return worker.start({
        serviceWorker:{url:"/TensorProject/mockServiceWorker.js"},
        onUnhandledRequest(req, print) {
            return; // Пропустим все запросы, не подходящие под наши хэндлеры
        }
    }) as Promise<void>; // либа не экспортирует нужный интерфейс
}