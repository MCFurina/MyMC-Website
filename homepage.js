getServerStatus();
setInterval(getServerStatus, 30000); // 每30秒刷新

function manualRefresh(btn) {
    btn.disabled = true;
    btn.textContent = '刷新中...';
    getServerStatus().finally(() => {
        btn.disabled = false;
        btn.textContent = '刷新';
    });
}

function copyButton(btn, copy) {
    const originalText = btn.textContent;
    btn.disabled = true;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(copy).then(
            () => done("复制成功"),
            () => done("复制失败")
        );
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = copy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            done("复制成功");
        } catch {
            done("复制失败");
        }
        document.body.removeChild(textarea);
    }

    function done(msg) {
        btn.textContent = msg;
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    }
}

async function getServerStatus() {
    try {
        const response = await fetch('https://motd.minebbs.com/api/status?ip=mymcland.top');
        const data = await response.json();
        document.getElementById('onlinePlayers').textContent = data.players.online;
        document.getElementById('maxPlayers').textContent = data.players.max;
        document.getElementById('serverMotd').style.color = 'inherit';
        document.getElementById('serverMotd').textContent = data.pureMotd || '';
        const icon = document.getElementById('serverIcon');
        icon.style.display = 'inline';
        if (data.icon && /^data:image\/[a-z]+;base64,/.test(data.icon)) {
            icon.src = data.icon;
            icon.style.visibility = 'visible';
        } else {
            icon.style.visibility = 'hidden';
        }
    } catch (error) {
        document.getElementById('onlinePlayers').textContent = '--';
        document.getElementById('maxPlayers').textContent = '--';
        document.getElementById('serverMotd').textContent = '无法连接至服务器';
        document.getElementById('serverMotd').style.color = 'red';
        document.getElementById('serverIcon').style.display = 'none';
    }
}