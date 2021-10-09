# CryptoApp
## this is the back end repo for the Crypto App

### Ruby

These files are written with Ruby and requires Ruby version ~>3.0.2 to be installed on the operating system executing the program.

#### Changing_Versions
If Ruby is installed on your system, verify the currently used version with the command `ruby -v`

You can list all installed Ruby versions on your machine with `rvm list`

Changing the currently used version of Ruby to a version ~>3.0.2 can be achieved with the command `rvm use 3.0.2` (or your specified version).

Running `rvm list` again will confirm that that version is the current

#### Installing_Versions
If you do not have a version of Ruby version  ~>3.0.2 on your machine you, can obtain it by running `rvm install 3.0.2`.

This installation requires `Ruby Version Manager` (RVM). If RVM is not installed on your machine, that can be downloaded and installed with the following command:

`curl -sSL https://get.rvm.io | bash`

When RVM is installed, run `rvm reload` or close and reopen your terminal to make sure RVM is fully loaded. Next, install the Ruby version ~>3.0.2 with the subsequent commands:

`rvm install 3.0.2`
`rvm use 3.0.2`

Please see the [Ruby installation instructions](https://www.ruby-lang.org/en/documentation/installation/) for further information about installing RVM or a Ruby verion on your machine.

### Rails
### Postgresql

## Run
To use CryptoApp, visit the file's repo on Github.

From there, download a zipped copy of the repo files or use its web url to clone.
![NadavsSchwartz](./app/assets/images/clone.png) 
Please have ruby and rails installed prior to running this application, as well as the [other dependencies listed in the Front End Repo](https://github.com/NadavsSchwartz/cryptoproject#dependencies).

After unzipping and saving the contents to the desired directory (or using git clone to clone the repo in your terminal), change directories to the directory containing the copy of the repo.

From within that directory, and run `bundle install` to install all the gems required for this program.

From within that directory, run `rails s` in your terminal, then open `localhost:3000` in a web browser.

The program will run and prompt user to sign-up or login.

To close the program, logout of your account, exit your web browser, and press `ctrl + C` in your terminal to exit rails server.
