import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            name: 'refresh-plugin',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    fs.writeFile('cloudPreview.js', `//${new Date().toISOString()}`, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                    next();
                });
            },
        },
    ],
    base: './',
    build: {
        outDir: '../guoshipartners/static/creative_cloud/preview',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                banner: () => {
                    const getTWTimeStr = () => {
                        const d = new Date();
                        const localTime = d.getTime();
                        const localOffset = d.getTimezoneOffset() * 60000;
                        const utc = localTime + localOffset;
                        const offset = +8;
                        const tw = utc + 3600000 * offset;
                        return new Date(tw).toLocaleString('en-US');
                    };
                    const timeFormatter = (timeStr) => {
                        const [inputDate, inputTime] = timeStr.split(', ');
                        const tempDate = inputDate.split('/').map((item) => {
                            if (item.length < 2) {
                                return '0' + item;
                            }
                            return item;
                        });
                        tempDate.unshift(tempDate.pop()); // 將尾(年份)放到最前面
                        const formattedDate = tempDate.join('-');
                        return `${formattedDate} ${inputTime}`;
                    };
                    const formattedTime = timeFormatter(getTWTimeStr());
                    return `/*! creative cloud preview ${formattedTime}\n*/`;
                },
            },
        },
    },
});
