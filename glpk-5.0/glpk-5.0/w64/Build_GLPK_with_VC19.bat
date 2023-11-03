rem Build GLPK with Microsoft Visual Studio Community 2015

rem NOTE: Make sure that HOME variable specifies correct path
set HOME="C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC"


call %HOME%\Auxiliary\Build\vcvarsall.bat x64
copy config_VC config.h
%HOME%\Tools\MSVC\14.29.30133\bin\Hostx64\x64\nmake.exe /f Makefile_VC
%HOME%\Tools\MSVC\14.29.30133\bin\Hostx64\x64\nmake.exe /f Makefile_VC check

pause
