!include "FileAssociation.nsh"
# define installer name
OutFile "Dakika.exe"
 
# set desktop as install directory
InstallDir "$PROGRAMFILES64\Dakika"
 
# default section start
Section
 
# define output path
SetOutPath $INSTDIR
 
# specify file to go in output path
File /r "C:\Users\dwanyoike\Dakika\builds\Dakika-win32-x64\*"
 
# define uninstaller name
WriteUninstaller $INSTDIR\uninstaller.exe
 
${registerExtension} "$INSTDIR\Dakika.exe" ".min" "Minute File" 

#WriteRegStr HKCR "Minute File" "" "$INSTDIR\Dakika.exe,1"
#-------
# default section end
SectionEnd
 
# create a section to define what the uninstaller does.
# the section will always be named "Uninstall"
Section "Uninstall"
 
# Always delete uninstaller first
${unregisterExtension} ".min" "Minute File" 
 
#remove the install directory 
RmDir /r $INSTDIR

# now delete installed file
Delete $DESKTOP\Dakika.lnk

Delete $INSTDIR\uninstaller.exe

SectionEnd

#Desktop Shortcut
Section "Desktop Shortcut" SectionX
    SetShellVarContext current
    CreateShortCut "$DESKTOP\Dakika.lnk" "$INSTDIR\Dakika.exe"
SectionEnd