import shutil
import os
from rich import print
# Specify the source and destination paths
source_path = "./nginxLOCAL.conf"
destination_path = "../nginx.conf"
def configureEnvironment(environment):
  print("Configuring environment: " + environment);
  if environment == 'prod':
    configureProdEnvironment()
  elif environment == 'local':  #a.k.a. dev
    configureLocalEnvironment()
  elif environment == 'thisisatest':  #a.k.a. dev
    configureThisIsATest()


#a.k.a. dev
def configureThisIsATest():
   copy_over("./testThisIsATest.ignorethisfile", "./test.ignorethisfile")

#a.k.a. dev
def configureLocalEnvironment():
   copy_over("./environment.developmentLOCAL.ts", "../angular-app/src/environments/environment.development.ts")   
   copy_over("./environmentLOCAL.ts", "../angular-app/src/environments/environment.ts")     
   copy_over("./nginxLOCAL.conf", "../nginx.conf")
   copy_over("../Secrets/envLOCALnest-app", "../nest-app/.env")
   copy_over("../Secrets/auth_configLOCALangular-app.json", "../angular-app/auth_config.json")
   copy_over("../Secrets/keysLOCALnest-app.ts", "../nest-app/src/config/keys.ts")


def configureProdEnvironment():
   copy_over("./environment.developmentPROD.ts", "../angular-app/src/environments/environment.development.ts")   
   copy_over("./environmentPROD.ts", "../angular-app/src/environments/environment.ts")      
   copy_over("./nginxPROD.conf", "../nginx.conf")
   copy_over("../Secrets/envPRODnest-app", "../nest-app/.env")
   copy_over("../Secrets/auth_configPRODangular-app.json", "../angular-app/auth_config.json")
   copy_over("../Secrets/keysPRODnest-app.ts", "../nest-app/src/config/keys.ts")   


def copy_over(source_path, destination_path):
  print(f"{source_path} [yellow]copied[/yellow] over {destination_path}: ", end='')
  try:
    shutil.copy2(source_path, destination_path)
    print("[green](Success)[/green]")
  except FileNotFoundError:
    print("[red](Failure)[/red] : Source file not found.")
  except PermissionError:
    print("[red](Failure)[/red] : Permission denied.")
  except Exception as e:
    print(f"[red](Failure)[/red] : An error occurred: {e}")