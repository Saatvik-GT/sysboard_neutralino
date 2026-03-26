Neutralino.init();

Neutralino.events.on('ready', async () => {
    try {
        
const os = await Neutralino.computer.getOSInfo();
document.getElementById('os-info').innerText = `${os.name} ${os.version}`;


console.log('OS Info object:', JSON.stringify(os));


document.getElementById('kernel-info').innerText = os.description || os.kernel || 'N/A';
document.getElementById('cpu-info').innerText = os.arch || os.machine || 'N/A';

        
        const mem = await Neutralino.computer.getMemoryInfo();
        const totalGB = (mem.physical.total / 1e9).toFixed(1);
        const usedGB = ((mem.physical.total - mem.physical.available) / 1e9).toFixed(1);
        document.getElementById('mem-info').innerText = `${usedGB} GB used / ${totalGB} GB total`;

    } catch (e) {
        console.error('Error loading system info:', e);
        document.getElementById('os-info').innerText = 'Error: ' + e.message;
    }

    
    document.getElementById('btn-folder').addEventListener('click', async () => {
        try {
            const folder = await Neutralino.os.showFolderDialog('Pick a folder');
            document.getElementById('output').innerText = `Folder Selected: ${folder}`;
        } catch (e) {
            document.getElementById('output').innerText = 'Dialog cancelled or error: ' + e.message;
        }
    });

    
    document.getElementById('btn-notify').addEventListener('click', async () => {
        try {
            await Neutralino.os.showNotification('SysBoard', 'Hello from Neutralinojs! How are you?');
            document.getElementById('output').innerText = 'Hey, Notification has been sent!';
        } catch (e) {
            document.getElementById('output').innerText = 'Notification error: ' + e.message;
        }
    });

    
    document.getElementById('btn-cmd').addEventListener('click', async () => {
        try {
            const result = await Neutralino.os.execCommand('echo Hello from shell');
            document.getElementById('output').innerText = `▶ Output: ${result.stdOut.trim()}`;
        } catch (e) {
            document.getElementById('output').innerText = 'Command error: ' + e.message;
        }
    });
});