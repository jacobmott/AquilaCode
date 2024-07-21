# AquilaCode

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Integrate with editors
<details>
Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.
</details>details>
## Nx plugins and code generators
<details>
Add Nx plugins to leverage their code generators and automated, inferred tasks.

```
# Add plugin
npx nx add @nx/react

# Use code generator
npx nx generate @nx/react:app demo

# Run development server
npx nx serve demo

# View project details
npx nx show project demo --web
```

Run `npx nx list` to get a list of available plugins and whether they have generators. Then run `npx nx list <plugin-name>` to see what generators are available.

Learn more about [code generators](https://nx.dev/features/generate-code) and [inferred tasks](https://nx.dev/concepts/inferred-tasks) in the docs.
</details>
## Running tasks
<details>
To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).
</details>
## Set up CI!
<details>
Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)
</details>
## Explore the project graph
<details>
Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
</details>
## Connect with us!
<details>
- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
</details>

## Commands ran to setup the nx project and initial repo/structure

### Setting up nx monorepo for angular and nestjs
<details>
**Used this stackoverflow post to help**

https://stackoverflow.com/questions/77347982/nx-monorepo-nestjs-angular

```
Run "npm i -g nx" to be able to execute command directly.
PS D:\OtherProjects> npx create-nx-workspace@latest

 NX   Let's create a new workspace [https://nx.dev/getting-started/intro]

√ Where would you like to create your workspace? · AquilaCode
√ Which stack do you want to use? · none
√ Package-based monorepo, integrated monorepo, or standalone project? · integrated
√ Which CI provider would you like to use? · skip
√ Would you like remote caching to make your build faster? · skip

 NX   Creating your v19.5.1 workspace.

✔ Installing dependencies with npm
✔ Successfully created the workspace: AquilaCode.

—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


 NX   Nx CLI is not installed globally.

This means that you will have to use "npx nx" to execute commands in the workspace.
Run "npm i -g nx" to be able to execute command directly.


—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


 NX   First time using Nx? Check out this interactive Nx tutorial.

https://nx.dev/getting-started/tutorials/npm-workspaces-tutorial

PS D:\OtherProjects> cd .\AquilaCode\
PS D:\OtherProjects\AquilaCode> npm i -D @nx/angular @nx/nest @nx/js
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated @humanwhocodes/config-array@0.11.14: Use @eslint/config-array instead
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead

added 863 packages, and audited 1225 packages in 32s

189 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
PS D:\OtherProjects\AquilaCode> nx g @nx/angular:app angular-app
nx : The term 'nx' is not recognized as the name of a cmdlet, function, script file, or operable program. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
At line:1 char:1
+ nx g @nx/angular:app angular-app
+ ~~
    + CategoryInfo          : ObjectNotFound: (nx:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS D:\OtherProjects\AquilaCode> npm i -g nx

added 114 packages in 3s

22 packages are looking for funding
  run `npm fund` for details
PS D:\OtherProjects\AquilaCode> nx g @nx/angular:app angular-app
nx : File C:\Users\jacob\AppData\Roaming\npm\nx.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
At line:1 char:1
+ nx g @nx/angular:app angular-app
+ ~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
PS D:\OtherProjects\AquilaCode>
```


**To get around the above issue, Switched from vs code terminal (that uses powershell) To Cygwin/mono terminal**

Generate angular app
```
[5.2][513][jacob@jakesbeastmech][/d/OtherProjects]
$cd AquilaCode/
total 786K
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:37 node_modules
-rw-r--r-- 1 jacob 197609  252 Jul 21 14:36 nx.json
-rw-r--r-- 1 jacob 197609  274 Jul 21 14:37 package.json
-rw-r--r-- 1 jacob 197609 652K Jul 21 14:37 package-lock.json
-rw-r--r-- 1 jacob 197609 2.4K Jul 21 14:36 README.md
[5.2][514][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$nx g @nx/angular:app angular-app

 NX  Generating @nx/angular:application

In Nx 20, generating projects will no longer derive the name and root.
Please provide the exact project name and root in the future.
Example: nx g @nx/angular:application angular-app --directory angular-app
Fetching prettier...
Fetching @nx/playwright...
CREATE tsconfig.base.json
CREATE .prettierrc
CREATE .prettierignore
UPDATE .vscode/extensions.json
UPDATE package.json
UPDATE .gitignore
UPDATE nx.json
CREATE angular-app/project.json
CREATE angular-app/src/index.html
CREATE angular-app/src/styles.css
CREATE angular-app/tsconfig.app.json
CREATE angular-app/tsconfig.editor.json
CREATE angular-app/tsconfig.json
CREATE angular-app/public/favicon.ico
CREATE angular-app/src/app/app.component.html
CREATE angular-app/src/app/app.component.spec.ts
CREATE angular-app/src/app/app.component.ts
CREATE angular-app/src/app/app.component.css
CREATE angular-app/src/app/app.config.ts
CREATE angular-app/src/app/app.routes.ts
CREATE angular-app/src/app/nx-welcome.component.ts
CREATE angular-app/src/main.ts
CREATE .eslintrc.json
CREATE .eslintignore
CREATE angular-app/.eslintrc.json
CREATE jest.preset.js
CREATE jest.config.ts
CREATE angular-app/jest.config.ts
CREATE angular-app/src/test-setup.ts
CREATE angular-app/tsconfig.spec.json
CREATE angular-app-e2e/project.json
CREATE angular-app-e2e/playwright.config.ts
CREATE angular-app-e2e/src/example.spec.ts
CREATE angular-app-e2e/tsconfig.json
CREATE angular-app-e2e/.eslintrc.json
npm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
npm warn deprecated domexception@4.0.0: Use your platform's native DOMException instead

added 290 packages, removed 2 packages, changed 1 package, and audited 1513 packages in 12s

212 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

 NX   � View Details of angular-app

Run "nx show project angular-app" to view details about this project.
```

Generate nest app
```
[5.2][515][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$nx g @nx/nest:app nest-app

 NX  Generating @nx/nest:application

In Nx 20, generating projects will no longer derive the name and root.
Please provide the exact project name and root in the future.
Example: nx g @nx/nest:application nest-app --directory nest-app
In Nx 20, generating projects will no longer derive the name and root.
Please provide the exact project name and root in the future.
Example: nx g @nx/node:application nest-app --directory nest-app
UPDATE package.json
UPDATE nx.json
CREATE nest-app/src/assets/.gitkeep
CREATE nest-app/src/main.ts
CREATE nest-app/tsconfig.app.json
CREATE nest-app/tsconfig.json
CREATE nest-app/webpack.config.js
CREATE nest-app/project.json
CREATE nest-app/.eslintrc.json
CREATE nest-app/jest.config.ts
CREATE nest-app/tsconfig.spec.json
CREATE nest-app-e2e/project.json
CREATE nest-app-e2e/jest.config.ts
CREATE nest-app-e2e/src/support/global-setup.ts
CREATE nest-app-e2e/src/support/global-teardown.ts
CREATE nest-app-e2e/src/support/test-setup.ts
CREATE nest-app-e2e/src/nest-app/nest-app.spec.ts
CREATE nest-app-e2e/tsconfig.json
CREATE nest-app-e2e/tsconfig.spec.json
CREATE nest-app-e2e/.eslintrc.json
CREATE nest-app/src/app/app.controller.spec.ts
CREATE nest-app/src/app/app.controller.ts
CREATE nest-app/src/app/app.module.ts
CREATE nest-app/src/app/app.service.spec.ts
CREATE nest-app/src/app/app.service.ts

added 53 packages, changed 5 packages, and audited 1566 packages in 5s

218 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

 NX   � View Details of nest-app-e2e

Run "nx show project nest-app-e2e" to view details about this project.


 NX   � View Details of nest-app

Run "nx show project nest-app" to view details about this project.
```

Generate shared lib directory 
```

[5.2][516][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$nx g @nx/js:lib shared-lib

 NX  Generating @nx/js:library

In Nx 20, generating projects will no longer derive the name and root.
Please provide the exact project name and root in the future.
Example: nx g @nx/js:library shared-lib --directory shared-lib
CREATE shared-lib/tsconfig.json
CREATE shared-lib/src/index.ts
CREATE shared-lib/src/lib/shared-lib.spec.ts
CREATE shared-lib/src/lib/shared-lib.ts
CREATE shared-lib/tsconfig.lib.json
CREATE shared-lib/README.md
CREATE shared-lib/package.json
UPDATE nx.json
CREATE shared-lib/project.json
CREATE shared-lib/.eslintrc.json
CREATE shared-lib/jest.config.ts
CREATE shared-lib/tsconfig.spec.json
UPDATE tsconfig.base.json

 NX   � View Details of shared-lib

Run "nx show project shared-lib" to view details about this project.
```
</details>

  
### Setting up git repo
<details>

```

[5.2][517][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$ls -lt
total 999K
-rw-r--r-- 1 jacob 197609 2.0K Jul 21 14:40 nx.json
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:40 shared-lib
-rw-r--r-- 1 jacob 197609  533 Jul 21 14:40 tsconfig.base.json
-rw-r--r-- 1 jacob 197609 810K Jul 21 14:39 package-lock.json
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:39 node_modules
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:39 nest-app-e2e
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:39 nest-app
-rw-r--r-- 1 jacob 197609 2.3K Jul 21 14:39 package.json
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:38 angular-app
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:38 angular-app-e2e
-rw-r--r-- 1 jacob 197609  126 Jul 21 14:38 jest.config.ts
-rw-r--r-- 1 jacob 197609   88 Jul 21 14:38 jest.preset.js
-rw-r--r-- 1 jacob 197609 2.4K Jul 21 14:36 README.md


[5.2][522][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git init && git symbolic-ref HEAD refs/heads/main
Reinitialized existing Git repository in D:/OtherProjects/AquilaCode/.git/
[5.2][523][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .editorconfig
        new file:   .gitignore
        new file:   .vscode/extensions.json
        new file:   README.md
        new file:   nx.json
        new file:   package-lock.json
        new file:   package.json

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore
        modified:   .vscode/extensions.json
        modified:   nx.json
        modified:   package-lock.json
        modified:   package.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .eslintignore
        .eslintrc.json
        .prettierignore
        .prettierrc
        angular-app-e2e/
        angular-app/
        jest.config.ts
        jest.preset.js
        nest-app-e2e/
        nest-app/
        shared-lib/
        tsconfig.base.json

[5.2][524][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git add .
[5.2][525][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git status
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .editorconfig
        new file:   .eslintignore
        new file:   .eslintrc.json
        new file:   .gitignore
        new file:   .prettierignore
        new file:   .prettierrc
        new file:   .vscode/extensions.json
        new file:   README.md
        new file:   angular-app-e2e/.eslintrc.json
        new file:   angular-app-e2e/playwright.config.ts
        new file:   angular-app-e2e/project.json
        new file:   angular-app-e2e/src/example.spec.ts
        new file:   angular-app-e2e/tsconfig.json
        new file:   angular-app/.eslintrc.json
        new file:   angular-app/jest.config.ts
        new file:   angular-app/project.json
        new file:   angular-app/public/favicon.ico
        new file:   angular-app/src/app/app.component.css
        new file:   angular-app/src/app/app.component.html
        new file:   angular-app/src/app/app.component.spec.ts
        new file:   angular-app/src/app/app.component.ts
        new file:   angular-app/src/app/app.config.ts
        new file:   angular-app/src/app/app.routes.ts
        new file:   angular-app/src/app/nx-welcome.component.ts
        new file:   angular-app/src/index.html
        new file:   angular-app/src/main.ts
        new file:   angular-app/src/styles.css
        new file:   angular-app/src/test-setup.ts
        new file:   angular-app/tsconfig.app.json
        new file:   angular-app/tsconfig.editor.json
        new file:   angular-app/tsconfig.json
        new file:   angular-app/tsconfig.spec.json
        new file:   jest.config.ts
        new file:   jest.preset.js
        new file:   nest-app-e2e/.eslintrc.json
        new file:   nest-app-e2e/jest.config.ts
        new file:   nest-app-e2e/project.json
        new file:   nest-app-e2e/src/nest-app/nest-app.spec.ts
        new file:   nest-app-e2e/src/support/global-setup.ts
        new file:   nest-app-e2e/src/support/global-teardown.ts
        new file:   nest-app-e2e/src/support/test-setup.ts
        new file:   nest-app-e2e/tsconfig.json
        new file:   nest-app-e2e/tsconfig.spec.json
        new file:   nest-app/.eslintrc.json
        new file:   nest-app/jest.config.ts
        new file:   nest-app/project.json
        new file:   nest-app/src/app/app.controller.spec.ts
        new file:   nest-app/src/app/app.controller.ts
        new file:   nest-app/src/app/app.module.ts
        new file:   nest-app/src/app/app.service.spec.ts
        new file:   nest-app/src/app/app.service.ts
        new file:   nest-app/src/assets/.gitkeep
        new file:   nest-app/src/main.ts
        new file:   nest-app/tsconfig.app.json
        new file:   nest-app/tsconfig.json
        new file:   nest-app/tsconfig.spec.json
        new file:   nest-app/webpack.config.js
        new file:   nx.json
        new file:   package-lock.json
        new file:   package.json
        new file:   shared-lib/.eslintrc.json
        new file:   shared-lib/README.md
        new file:   shared-lib/jest.config.ts
        new file:   shared-lib/package.json
        new file:   shared-lib/project.json
        new file:   shared-lib/src/index.ts
        new file:   shared-lib/src/lib/shared-lib.spec.ts
        new file:   shared-lib/src/lib/shared-lib.ts
        new file:   shared-lib/tsconfig.json
        new file:   shared-lib/tsconfig.lib.json
        new file:   shared-lib/tsconfig.spec.json
        new file:   tsconfig.base.json

[5.2][526][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git commit -m "First commit"
[main (root-commit) 2df2fe6] First commit
 72 files changed, 24902 insertions(+)
 create mode 100644 .editorconfig
 create mode 100644 .eslintignore
 create mode 100644 .eslintrc.json
 create mode 100644 .gitignore
 create mode 100644 .prettierignore
 create mode 100644 .prettierrc
 create mode 100644 .vscode/extensions.json
 create mode 100644 README.md
 create mode 100644 angular-app-e2e/.eslintrc.json
 create mode 100644 angular-app-e2e/playwright.config.ts
 create mode 100644 angular-app-e2e/project.json
 create mode 100644 angular-app-e2e/src/example.spec.ts
 create mode 100644 angular-app-e2e/tsconfig.json
 create mode 100644 angular-app/.eslintrc.json
 create mode 100644 angular-app/jest.config.ts
 create mode 100644 angular-app/project.json
 create mode 100644 angular-app/public/favicon.ico
 create mode 100644 angular-app/src/app/app.component.css
 create mode 100644 angular-app/src/app/app.component.html
 create mode 100644 angular-app/src/app/app.component.spec.ts
 create mode 100644 angular-app/src/app/app.component.ts
 create mode 100644 angular-app/src/app/app.config.ts
 create mode 100644 angular-app/src/app/app.routes.ts
 create mode 100644 angular-app/src/app/nx-welcome.component.ts
 create mode 100644 angular-app/src/index.html
 create mode 100644 angular-app/src/main.ts
 create mode 100644 angular-app/src/styles.css
 create mode 100644 angular-app/src/test-setup.ts
 create mode 100644 angular-app/tsconfig.app.json
 create mode 100644 angular-app/tsconfig.editor.json
 create mode 100644 angular-app/tsconfig.json
 create mode 100644 angular-app/tsconfig.spec.json
 create mode 100644 jest.config.ts
 create mode 100644 jest.preset.js
 create mode 100644 nest-app-e2e/.eslintrc.json
 create mode 100644 nest-app-e2e/jest.config.ts
 create mode 100644 nest-app-e2e/project.json
 create mode 100644 nest-app-e2e/src/nest-app/nest-app.spec.ts
 create mode 100644 nest-app-e2e/src/support/global-setup.ts
 create mode 100644 nest-app-e2e/src/support/global-teardown.ts
 create mode 100644 nest-app-e2e/src/support/test-setup.ts
 create mode 100644 nest-app-e2e/tsconfig.json
 create mode 100644 nest-app-e2e/tsconfig.spec.json
 create mode 100644 nest-app/.eslintrc.json
 create mode 100644 nest-app/jest.config.ts
 create mode 100644 nest-app/project.json
 create mode 100644 nest-app/src/app/app.controller.spec.ts
 create mode 100644 nest-app/src/app/app.controller.ts
 create mode 100644 nest-app/src/app/app.module.ts
 create mode 100644 nest-app/src/app/app.service.spec.ts
 create mode 100644 nest-app/src/app/app.service.ts
 create mode 100644 nest-app/src/assets/.gitkeep
 create mode 100644 nest-app/src/main.ts
 create mode 100644 nest-app/tsconfig.app.json
 create mode 100644 nest-app/tsconfig.json
 create mode 100644 nest-app/tsconfig.spec.json
 create mode 100644 nest-app/webpack.config.js
 create mode 100644 nx.json
 create mode 100644 package-lock.json
 create mode 100644 package.json
 create mode 100644 shared-lib/.eslintrc.json
 create mode 100644 shared-lib/README.md
 create mode 100644 shared-lib/jest.config.ts
 create mode 100644 shared-lib/package.json
 create mode 100644 shared-lib/project.json
 create mode 100644 shared-lib/src/index.ts
 create mode 100644 shared-lib/src/lib/shared-lib.spec.ts
 create mode 100644 shared-lib/src/lib/shared-lib.ts
 create mode 100644 shared-lib/tsconfig.json
 create mode 100644 shared-lib/tsconfig.lib.json
 create mode 100644 shared-lib/tsconfig.spec.json
 create mode 100644 tsconfig.base.json
[5.2][527][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git status
On branch main
nothing to commit, working tree clean
[5.2][528][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git push
fatal: No configured push destination.
Either specify the URL from the command-line or configure a remote repository using

    git remote add <name> <url>

and then push using the remote name

    git push <name>

[5.2][529][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git remote add origin git@github.com:^Cemo_app.git
[5.2][529][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git remote add origin git@github.com:jacobmott/AquilaCode.git
[5.2][530][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git status
On branch main
nothing to commit, working tree clean
[5.2][531][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git push
fatal: The current branch main has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin main

To have this happen automatically for branches without a tracking
upstream, see 'push.autoSetupRemote' in 'git help config'.

[5.2][532][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git push --set-upstream origin main
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
[5.2][533][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git remote add origin git@github.com:jacobmott/AquilaCode.git
error: remote origin already exists.
[5.2][534][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git push -u origin main
Writing objects:  85% (76/89)Writing objects: 100% (89/89), 209.03 KiB | 5.81 MiB/s, done.
Total 89 (delta 14), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (14/14), done.
To github.com:jacobmott/AquilaCode.git
 * [new branch]      main -> mainbranch 'main' set up to track 'origin/main'.
[5.2][535][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
[5.2][536][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$ls
total 999K
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:38 angular-app
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:38 angular-app-e2e
-rw-r--r-- 1 jacob 197609  126 Jul 21 14:38 jest.config.ts
-rw-r--r-- 1 jacob 197609   88 Jul 21 14:38 jest.preset.js
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:39 nest-app
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:39 nest-app-e2e
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:39 node_modules
-rw-r--r-- 1 jacob 197609 2.0K Jul 21 14:40 nx.json
-rw-r--r-- 1 jacob 197609 2.3K Jul 21 14:39 package.json
-rw-r--r-- 1 jacob 197609 810K Jul 21 14:39 package-lock.json
-rw-r--r-- 1 jacob 197609 2.4K Jul 21 14:36 README.md
drwxr-xr-x 1 jacob 197609    0 Jul 21 14:40 shared-lib
-rw-r--r-- 1 jacob 197609  533 Jul 21 14:40 tsconfig.base.json
[5.2][537][jacob@jakesbeastmech][/d/OtherProjects/AquilaCode]
$
```
</details>
