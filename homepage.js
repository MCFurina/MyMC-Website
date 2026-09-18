    getServerStatus();
    function copyJavaIP(btn) {

        const textToCopy = "mymcland.top";
        const originalText = btn.textContent;

        navigator.clipboard.writeText(textToCopy).then(() => {
            btn.textContent = "复制成功"
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        }).catch(() => {
            btn.textContent = "复制失败"
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        });
    }
    function copyBedrockIP(btn) {

        const textToCopy = "be.mymcland.top";
        const originalText = btn.textContent;

        navigator.clipboard.writeText(textToCopy).then(() => {
            btn.textContent = "复制成功"
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        }).catch(() => {
            btn.textContent = "复制失败"
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        });
    }
    function copyBedrockPort(btn) {

        const textToCopy = "40016";
        const originalText = btn.textContent;

        navigator.clipboard.writeText(textToCopy).then(() => {
            btn.textContent = "复制成功"
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        }).catch(() => {
            btn.textContent = "复制失败"
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 2000);
        });
    }
    async function getServerStatus() {
        try{
            const response = await fetch('https://motd.minebbs.com/api/status?ip=mymcland.top');
            const data = await response.json();
            console.log('获取服务器状态成功：', data);
            if (data.status == 'online') {
                document.getElementById('onlineStatus').textContent = '在线';
            } else {
                document.getElementById('onlineStatus').textContent = '离线';
            }
            document.getElementById('onlinePlayers').textContent = data.players.online;
            document.getElementById('maxPlayers').textContent = data.players.max;
        } catch (error) {
            console.error('获取服务器状态失败：', error);
            document.getElementById('onlineStatus').textContent = '获取失败';
            document.getElementById('onlinePlayers').textContent = '获取失败';
            document.getElementById('maxPlayers').textContent = '获取失败';
        }
    }