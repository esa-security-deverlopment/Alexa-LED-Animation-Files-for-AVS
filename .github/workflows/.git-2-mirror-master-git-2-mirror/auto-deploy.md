# Auto-deploying built products to gh-pages with Travis

This is a set up for projects which want to check in only their source files, but have their gh-pages branch automatically updated with some compiled output every time they push.

## Create a compile script

You want a script that does a local compile to e.g. an `out/` directory. Let's call this `compile.sh` for our purposes, but for your project it might be `npm build` or `gulp make-docs` or `make` or anything similar.

The `out/` directory should contain everything you want deployed to `gh-pages`. That almost always includes an `index.html`.

Check this script in to your project.

## Sign up for Travis and add your project

Get an account at https://travis-ci.com/. Turn on Travis for your repository in question, using the Travis control panel.

## Get encrypted credentials

The trickiest part of all this is that you want to give Travis the ability to run your deploy script and push changes to gh-pages, without checking in the necessary credentials to your repo. The solution for this is to use Travis's [encrypted file support](https://docs.travis-ci.com/user/encrypting-files/).

_NOTE: an earlier version of this guide recommended generating a GitHub personal access token and encrypting that. Although this is simpler, it is not a good idea in general, since it means any of your repository's collaborators would be able to edit the Travis build script to email them your access token, thus giving them access to all your repositories. The repository-specific deploy key approach is safer._

First, [generate a new SSH key](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/). You should _not_ reuse existing SSH keys, and you should _not_ add the SSH key to your GitHub account. Also, you must ensure that you do not include a passphrase (i.e., just press enter when asked for one).

Next, add that deploy key to your repository at `https://github.com/<your name>/<your repo>/settings/keys`.

Now use the Travis client to encrypt the generated deploy key. The result should look something like this:

```
$ travis encrypt-file deploy_key
encrypting deploy_key for domenic/travis-encrypt-file-example
storing result as deploy_key.enc
storing secure env variables for decryption

Please add the following to your build script (before_install stage in your .travis.yml, for instance):

    openssl aes-256-cbc -K $encrypted_0a6446eb3ae3_key -iv $encrypted_0a6446eb3ae3_key -in deploy_key.enc -out deploy_key -d

Pro Tip: You can add it automatically by running with --add.

Make sure to add deploy_key.enc to the git repository.
Make sure not to add deploy_key to the git repository.
Commit all changes to your .travis.yml.
```

You should follow the instructions and commit `deploy_key.enc` to the repository. You should also add `deploy_key` to your `.gitignore`, or delete it. Ignore the bits about `.travis.yml`, however; we're going to do that part all custom-like.

## Create your `.travis.yml` file

With all this in hand, you can create a `.travis.yml` file. It should look like this:

```yml
language: generic # don't install any environment
script:
- bash ./compile.sh

branches:
  only:
  - master

before_deploy:
- openssl aes-256-cbc -K $encrypted_0a6446eb3ae3_key -iv $encrypted_0a6446eb3ae3_key -in deploy_key.enc -out deploy_key -d


deploy:
  provider: pages
  local_dir: out
  deploy_key: deploy_key
  edge:
    branch: master

notifications:
  email:
    on_success: never
    on_failure: always
```

If your compile script depends on certain environment features, you might want to set up the environment using Travis's built-in abilities, e.g. by changing the language lines like so:

```yml
language: node_js
node_js:
- stable
```

(In this case, [by default](http://docs.travis-ci.com/user/languages/javascript-with-nodejs/) Travis will install the latest stable Node.js, then run `npm install`.)

## Finishing up

At this point you should have 3 files checked in to your repo: `compile.sh` `deploy_key.enc`, and `.travis.yml`. If you've also told Travis about your repo, then the first time you push to GitHub with these changes, it will automatically compile and deploy your source!

## See it in action

I use basically this exact setup for https://github.com/wicg/origin-policy. The relevant files are:

- https://github.com/WICG/origin-policy/blob/master/.travis.yml
- https://github.com/WICG/origin-policy/blob/master/Makefile (so I could use `make ci` instead of `bash ./compile.sh`)
- https://github.com/WICG/origin-policy/blob/master/deploy_key.enc

## Licensing

All code in the above post is licensed under the MIT License.