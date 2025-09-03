export interface Toast {
    status: 'success' | 'fail' | 'warn' | 'complete';
    message: string;
    time: number;


}