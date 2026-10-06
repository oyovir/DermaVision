npm install -g eas-cli

*Enable Running Scripts*
    POWERSHELL(ADMIN): Set-ExecutionPolicy Unrestricted
    Then A

    After done turn off running scripts with -
    POWERSHELL(ADMIN): Set-ExecutionPolicy Restricted
    Then A

eas build -p android --profile preview