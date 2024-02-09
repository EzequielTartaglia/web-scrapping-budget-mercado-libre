# start-services.ps1

# Verifica si el script se está ejecutando como administrador
if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Este script debe ejecutarse como administrador."
    $arguments = "& '" + $myinvocation.mycommand.definition + "'"
    Start-Process powershell -Verb runAs -ArgumentList $arguments
    exit
}

# Inicia el servicio MySQL
Get-Service -Name 'MySQL81'

# Cambia al directorio del servidor MySQL
Set-Location "C:\Program Files\MySQL\MySQL Server 8.1\bin"

# Inicia el servicio MySQL
net start MySQL81

# Cambia al directorio del servidor MySQL (por si acaso)
Set-Location "C:\Program Files\MySQL\MySQL Server 8.1\bin"

# Ejecuta el servidor MySQL
Start-Process -FilePath ".\mysqld.exe" -NoNewWindow

# Espera unos segundos para asegurarse de que MySQL tenga tiempo para iniciarse completamente
Start-Sleep -Seconds 5

# Otros comandos para iniciar servicios adicionales si es necesario

# Ejecuta el servidor Next.js después de que los servicios estén en funcionamiento
# (Asegúrate de proporcionar el comando correcto para iniciar Next.js)
# Ejemplo:
# Start-Process -FilePath "next" -ArgumentList "dev" -NoNewWindow
