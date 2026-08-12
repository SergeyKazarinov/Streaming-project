# Changelog

## [1.1.0](https://github.com/SergeyKazarinov/Streaming-project/compare/v1.0.0...v1.1.0) (2026-08-12)

### ✨ Новые функции

* **account:** add account resourse ([387b812](https://github.com/SergeyKazarinov/Streaming-project/commit/387b8124862ff9edff7a919f4064d83ca74925b4))
* add change avatar ([43d61cd](https://github.com/SergeyKazarinov/Streaming-project/commit/43d61cd0925cd850fb1002efbfc41818bb9eaf9d))
* add change profile ([892b914](https://github.com/SergeyKazarinov/Streaming-project/commit/892b91453c7f2fc266b257718db684bbea2ca6f9))
* add deactivate account ([01985ae](https://github.com/SergeyKazarinov/Streaming-project/commit/01985ae52d608a5bcce4c79e4dbad073c9c6a4e3))
* add delete deactivated account ([094b2db](https://github.com/SergeyKazarinov/Streaming-project/commit/094b2db43bf87cd20f19621db2fc3afc207f90ea))
* add maxLength validator ([dec165e](https://github.com/SergeyKazarinov/Streaming-project/commit/dec165e958d16aca7b8dd8f90c93234f391c173f))
* add s3 module ([8b738d0](https://github.com/SergeyKazarinov/Streaming-project/commit/8b738d0fa7ca7dca4abff2e16e07829628983416))
* add secureUser util ([8b32912](https://github.com/SergeyKazarinov/Streaming-project/commit/8b3291250121c809e8a718b5e81383fade514d98))
* add secureUserModel ([d581091](https://github.com/SergeyKazarinov/Streaming-project/commit/d5810912b1255550caaba49e452875f4fba9688a))
* add warning for the deleting account ([9b5b8a0](https://github.com/SergeyKazarinov/Streaming-project/commit/9b5b8a0d5bcd9dee95c101088f49c48f0e2b0712))
* **auth:** add login and logout methods ([3b99395](https://github.com/SergeyKazarinov/Streaming-project/commit/3b993955fe457f301be5f066a668d7d4c84cd769))
* **auth:** add the auth guard and the authorized decorator ([dcb7586](https://github.com/SergeyKazarinov/Streaming-project/commit/dcb75869ce2f4da52966d92b09cc0f5c5a7b79f5))
* **auth:** add TOTP ([517f64c](https://github.com/SergeyKazarinov/Streaming-project/commit/517f64c2e3bd5c77b2c5a44db418eb458068c10c))
* **category:** add category module ([72f6387](https://github.com/SergeyKazarinov/Streaming-project/commit/72f63874f1c8aee32f840f0cbb6a4a28e0334974))
* **channels:** add chanel module ([86ff165](https://github.com/SergeyKazarinov/Streaming-project/commit/86ff165c5b7f42afb0ae71edf6245b8629917307))
* **chat:** add chat module ([edd57b9](https://github.com/SergeyKazarinov/Streaming-project/commit/edd57b9f6d1a6a9d6461e87d982c090e4210f27f))
* create reset password ([78cd314](https://github.com/SergeyKazarinov/Streaming-project/commit/78cd314e7f522e9037abddc4e4271769e354e947))
* create user repository ([9f82e53](https://github.com/SergeyKazarinov/Streaming-project/commit/9f82e5337d226a5c401c90de3c8f61c5629441ae))
* **db:** add seed for the categories, users, streams ([37299c9](https://github.com/SergeyKazarinov/Streaming-project/commit/37299c943861db9f0c3fa77dc9637809782d7d5a))
* **email:** add email verification ([348d1b7](https://github.com/SergeyKazarinov/Streaming-project/commit/348d1b7c6f429d8c2e7d47d9dd88bf61aed81f9e))
* **follow:** add follow module ([92f36b1](https://github.com/SergeyKazarinov/Streaming-project/commit/92f36b11c6c28d781e524d14a5b4d4e209815530))
* **graphql:** add graphql settings ([1ebfe93](https://github.com/SergeyKazarinov/Streaming-project/commit/1ebfe934426c2529dab427b9edea4ac81bf1d9ec))
* **input:** add meta filters (paginatin, seach) ([996b11b](https://github.com/SergeyKazarinov/Streaming-project/commit/996b11b28fa1f013a658bb6d5777359b2512dd2f))
* **mail:** add deactivate template ([a4e4530](https://github.com/SergeyKazarinov/Streaming-project/commit/a4e45300ed5f29f6c1873d57772d498e82408a1c))
* **mail:** create a reset-password template ([02379ad](https://github.com/SergeyKazarinov/Streaming-project/commit/02379adf62993403f464ca3d35d3f18e9c7ee486))
* **notification:** add notification module ([562eb2f](https://github.com/SergeyKazarinov/Streaming-project/commit/562eb2f9f748b37aca9924289071903641af3ebf))
* **redis:** seting the redis ([d68f656](https://github.com/SergeyKazarinov/Streaming-project/commit/d68f65647354c73957d9664fe5c45d38090a10ed))
* **session:** add get sessions and remove sessions methods ([24e489f](https://github.com/SergeyKazarinov/Streaming-project/commit/24e489f8c33e4ed151832c7a0d17fc3a0afdc05d))
* **session:** add the session-metadata ([2e0ad81](https://github.com/SergeyKazarinov/Streaming-project/commit/2e0ad8176733c121139a0259d9ef869017b7a617))
* **social:** add social link modules ([89f2498](https://github.com/SergeyKazarinov/Streaming-project/commit/89f249870f96df3712f57e3adf2369531c13132d))
* **stream:** add change stream thumbailUrl ([c11f3c6](https://github.com/SergeyKazarinov/Streaming-project/commit/c11f3c6dd7250cd4763db439820fa91f67499c05))
* **stream:** add changeStreamInfo ([9464a8e](https://github.com/SergeyKazarinov/Streaming-project/commit/9464a8eba5e9cbf8240309989ad7700ca104aeea))
* **stream:** add findMany streams ([1fc7e73](https://github.com/SergeyKazarinov/Streaming-project/commit/1fc7e7398acc6c570f8b528008db4fdadadd9010))
* **stream:** add generate-token method ([4a0af8a](https://github.com/SergeyKazarinov/Streaming-project/commit/4a0af8a5a814ecc17dd1986c9b7b54964f42e02d))
* **stream:** add ingress module and livekit module ([55222b2](https://github.com/SergeyKazarinov/Streaming-project/commit/55222b272431b4252c05123615cf7860fe8bb5a5))
* **stream:** add randomStream method ([cfb1ad9](https://github.com/SergeyKazarinov/Streaming-project/commit/cfb1ad944b0b992eb19c35a76ecc9c98f22cba12))
* **stream:** add stream table and model ([b9ca8c8](https://github.com/SergeyKazarinov/Streaming-project/commit/b9ca8c82a993987f57aa4ea2ca9ead7b5555ad1a))
* **stream:** add webhook for the live-streams ([60942cd](https://github.com/SergeyKazarinov/Streaming-project/commit/60942cd8a51f2eaca58f9324aaf945dbebc65fd7))
* **telegram:** add followers strategy ([1dcefc8](https://github.com/SergeyKazarinov/Streaming-project/commit/1dcefc83ba83724265c0c94164d9fe9e1d6d55a6))
* **telegram:** add followings strategy ([a534356](https://github.com/SergeyKazarinov/Streaming-project/commit/a53435623a1bc5e042365fa15d61e087dfeebcf5))
* **telegram:** add logout strategy ([9765067](https://github.com/SergeyKazarinov/Streaming-project/commit/97650673c37ce59c028dcdf02d52f2b314a3b573))
* **telegram:** add telegram connection and profile button message ([e6dda7a](https://github.com/SergeyKazarinov/Streaming-project/commit/e6dda7ac12b8b12cc5ff9bdde99e2b285dd0a821))
* **telegram:** change website button ([bfa60d5](https://github.com/SergeyKazarinov/Streaming-project/commit/bfa60d5a213ecc3054aee7d00122adf2d4cdf22b))
* **user:** add change user email service ([77dff74](https://github.com/SergeyKazarinov/Streaming-project/commit/77dff74eb63822d96fd136275a7e59c96e0587ae))
* **user:** add change user password service ([874bad9](https://github.com/SergeyKazarinov/Streaming-project/commit/874bad9ab26e73dd5f9223eb7316508dacecc933))
* **user:** add mutation - create user ([8729531](https://github.com/SergeyKazarinov/Streaming-project/commit/8729531537ae2d11f1cb9e2aa5239dc1465bdebe))
* **validator:** update config for the validatorFactory ([aeca5f1](https://github.com/SergeyKazarinov/Streaming-project/commit/aeca5f1da29730d579b7432bc3812fc9ed42f6a9))

### 🐛 Исправления

* **cron:** fix handleWarnDeleteAccount for seven day ([a5ef7a7](https://github.com/SergeyKazarinov/Streaming-project/commit/a5ef7a7df52c7c78703b45fe4e34edaffe07a4e7))
* **deactivate:** change expiresInTime for Deactivate account ([88ca3ea](https://github.com/SergeyKazarinov/Streaming-project/commit/88ca3ea5cfc13a1c03d43cc3107e34ab5c7202b3))
* **Follow:** fix followers and followings requests ([e88878c](https://github.com/SergeyKazarinov/Streaming-project/commit/e88878c43c2f2760af1dcd911afa405a05bd7d87))
* **graphql:** change import for the join for path to node:path ([3bd0a5e](https://github.com/SergeyKazarinov/Streaming-project/commit/3bd0a5e3943cf20ebb79d77699d064aa5ac4a52c))
* **graphql:** change the playground to graphiql ([7f43483](https://github.com/SergeyKazarinov/Streaming-project/commit/7f4348320903fca974ad2bedaf5f2f4f2355ab7b))
* **livekit:** add readonly for the fields in the liveKitService ([6110b5b](https://github.com/SergeyKazarinov/Streaming-project/commit/6110b5bd5e69ffc9c5edb68697a1f4c7a99016e9))
* **login:** remove token when login deactibated user ([e03d309](https://github.com/SergeyKazarinov/Streaming-project/commit/e03d3090db49c2377451a59ec58938d26ade56fc))
* **mail:** add readonly for fields in the MailService ([055b24f](https://github.com/SergeyKazarinov/Streaming-project/commit/055b24f1a16805581123d3df472d4a47ec8f9923))
* **ms:** remove eslint-disable ([af728d7](https://github.com/SergeyKazarinov/Streaming-project/commit/af728d739fa8eaa749e5a5e7904420ad6111e65c))
* **prisma:** change generate client options' ([e0fc63d](https://github.com/SergeyKazarinov/Streaming-project/commit/e0fc63da0699fa20a4b95252fbbfeced49ad40db))
* **profile:** remove avatar in the storage for removeAvatar method ([31a5219](https://github.com/SergeyKazarinov/Streaming-project/commit/31a52195b044259f0b601a5a637268d9bf2969ac))
* **redis:** change redisClient ([cec4aa3](https://github.com/SergeyKazarinov/Streaming-project/commit/cec4aa37c3f10e8bb44dafe1cb8ddc5149fdecd0))
* **see:** change password for users ([a5a90b1](https://github.com/SergeyKazarinov/Streaming-project/commit/a5a90b1d78402eea166cf2d262704781e8535d2a))
* **session:** extract session.userId from expression ([feb1670](https://github.com/SergeyKazarinov/Streaming-project/commit/feb167088afcdaf8ed22329faa0277554c8336d2))
* **token:** change math.Random to randomInt ([fd11865](https://github.com/SergeyKazarinov/Streaming-project/commit/fd11865b6a7e165100ac40755582806773d32049))

### 📦 Рефакторинг

* **auth:** Compare with `undefined` directly ([130c89f](https://github.com/SergeyKazarinov/Streaming-project/commit/130c89ff3872315cc5599339ead8e125f2b6e8b2))
* change params for the generateToken, add docs ([be31201](https://github.com/SergeyKazarinov/Streaming-project/commit/be312010adfa79ff093c1c34f69cde32dbb1b5d7))
* change prisma lib to userRepository for all modules ([db77463](https://github.com/SergeyKazarinov/Streaming-project/commit/db77463735e18dcb93e180d146190a2fcb0fe7f3))
* change prisma lib to userRepository in the account service ([9cfe17f](https://github.com/SergeyKazarinov/Streaming-project/commit/9cfe17fe898a30873bcfb5cff0ebb7bfd634f94c))
* creata message consts, change in the session service ([04ffef0](https://github.com/SergeyKazarinov/Streaming-project/commit/04ffef04acd3bc744749f3a24a1bfc92a9df2f16))
* create a base-user-service ([d48d429](https://github.com/SergeyKazarinov/Streaming-project/commit/d48d4297933fb4e8ada1215ffa6be806fbb0a83d))
* create check-token util ([f1a8198](https://github.com/SergeyKazarinov/Streaming-project/commit/f1a8198bdd0922665c17304db3d10f4652b61cdf))
* create prisma module ([14d46bd](https://github.com/SergeyKazarinov/Streaming-project/commit/14d46bdfef37a3d18abfe9ff41e9fd045cb6ca00))
* create token repository ([3ecd404](https://github.com/SergeyKazarinov/Streaming-project/commit/3ecd404c94ca73be040c24f4dc1ce62cab470aca))
* **eslint:** add eslint rule for the import types ([0253973](https://github.com/SergeyKazarinov/Streaming-project/commit/0253973b4c52a452001db002903257f5a9d0691e))
* **ingress:** using an optonal chain expression for rules ([e1b1d86](https://github.com/SergeyKazarinov/Streaming-project/commit/e1b1d86518c7350e181d4906f7e67b8634518ace))
* **input:** create a base-password input ([004bf1d](https://github.com/SergeyKazarinov/Streaming-project/commit/004bf1d315b750f1da52e63451641b98aaa6dbdd))
* **input:** create a base-user input ([1172f0a](https://github.com/SergeyKazarinov/Streaming-project/commit/1172f0a034c0d52c8006cb24832219b9f7574c47))
* **messages:** change fn for the followers and followings ([4dbecc3](https://github.com/SergeyKazarinov/Streaming-project/commit/4dbecc391fea5f620e4aad214b0d353bc2130df3))
* **messages:** remove nested template literal ([91595e4](https://github.com/SergeyKazarinov/Streaming-project/commit/91595e4dac8280eb14592327e72afa958cf00c26))
* move mail templates to shared/templates ([87a52e7](https://github.com/SergeyKazarinov/Streaming-project/commit/87a52e78589eb6882a1c58a54b1fc1c7e024042a))
* **ms:** add class Number for static methods ([05a5365](https://github.com/SergeyKazarinov/Streaming-project/commit/05a53652168f97963eb71c828258bf03257b4f4a))
* **notification:** remove empty class ([40c0122](https://github.com/SergeyKazarinov/Streaming-project/commit/40c01226581342da03f103c50c747f21c909162a))
* **redis:** move redisClient to the separate module ([08ad4da](https://github.com/SergeyKazarinov/Streaming-project/commit/08ad4daafe98b1f1d9ea88a4496e9623143c4c50))
* **regexp:** using \w instead of [] ([f95f0a4](https://github.com/SergeyKazarinov/Streaming-project/commit/f95f0a4b94f77d8851f50da1dcbb1b5c56527b75))
* **session:** improve getSessionMetadata - create getUserIp fn ([e0923c9](https://github.com/SergeyKazarinov/Streaming-project/commit/e0923c96feee4888ba19fcefdd9802e8d1496615))
* **session:** move save and destroy session to libs ([f34fdc8](https://github.com/SergeyKazarinov/Streaming-project/commit/f34fdc8d77e9c197a61e730d36dee7e495c3cccb))
* **validate:** create a validatorFactory ([48b03a1](https://github.com/SergeyKazarinov/Streaming-project/commit/48b03a148377b4f9d61d7b1ef2302303b99c540c))
* **validatorFactory:** using an optonal chain expression for rules ([fae1f96](https://github.com/SergeyKazarinov/Streaming-project/commit/fae1f96516e6dcae9b7744fea79ffde744ee5167))
* **validator:** rename validator decorator to ValidatorFactory ([2dc9204](https://github.com/SergeyKazarinov/Streaming-project/commit/2dc92048b6915904744ede51a1a692f08e6ef16e))

### ♻️ Другие изменения

* add gitattributes ([b5b48ef](https://github.com/SergeyKazarinov/Streaming-project/commit/b5b48ef3a4aa5106c854d112ca541ebf910e6ebe))
* **deps:** bump minimatch from 10.2.1 to 10.2.4 ([d376582](https://github.com/SergeyKazarinov/Streaming-project/commit/d376582bd3f771a2da1190a4361f4efadfb06fdc))
* **telegram:** disable telegram bot ([e41a93e](https://github.com/SergeyKazarinov/Streaming-project/commit/e41a93e48d89c4e9878505406914becb595e4a39))

### ⚙️ Автоматизация

* add sonarQube action ([#1](https://github.com/SergeyKazarinov/Streaming-project/issues/1)) ([36ca0c2](https://github.com/SergeyKazarinov/Streaming-project/commit/36ca0c271df6153274093f36e5720781f1813601))

### 📚 Документация

* add descrioptions for the creating user ([2d73258](https://github.com/SergeyKazarinov/Streaming-project/commit/2d73258d9bef7a3fc07ea1d9f2338c0adea6294f))

### 🚨 Тесты

* **social-link:** create tests for the resolver and the service ([84b162a](https://github.com/SergeyKazarinov/Streaming-project/commit/84b162ab15e972667def3cd1ac6bea2c25356765))
* **social:** add unit tests for the social links ([3b32f15](https://github.com/SergeyKazarinov/Streaming-project/commit/3b32f1592a258b6eeb0ed191a9159765919ba32a))

### 🛠 Сборка

* **deps:** bump brace-expansion from 1.1.12 to 1.1.18 in /backend ([8b60a32](https://github.com/SergeyKazarinov/Streaming-project/commit/8b60a324bf4862a3a5e91b0c3c7448f06f68a6b6))
* **deps:** bump qs from 6.14.1 to 6.15.0 in /backend ([021fe8d](https://github.com/SergeyKazarinov/Streaming-project/commit/021fe8d008ad88a9914ee983ed1a2f15a229d7b3))
* **deps:** bump tar from 7.5.2 to 7.5.9 in /backend ([1b59c7c](https://github.com/SergeyKazarinov/Streaming-project/commit/1b59c7cc4f4e0937b85771b1ac0066385da31351))
* **deps:** bump tar from 7.5.9 to 7.5.10 in /backend ([ef5dd93](https://github.com/SergeyKazarinov/Streaming-project/commit/ef5dd93ad65f99485456f3128cad6072249b10c0))
* **deps:** bump tar from 7.5.9 to 7.5.11 ([c6fcb91](https://github.com/SergeyKazarinov/Streaming-project/commit/c6fcb9117a3924f94816741786adfa559fe01c86))
* **deps:** bump yauzl from 3.2.0 to 3.4.0 in /backend ([ea52205](https://github.com/SergeyKazarinov/Streaming-project/commit/ea52205ab02451b1e87d58e66c67db8204af2a1d))

## 1.0.0 (2026-02-18)

### ✨ Новые функции

* add husky and lint-staged ([41e9a85](https://github.com/SergeyKazarinov/Streaming-project/commit/41e9a851fe1916c46b29129d56e940b8527b253d))

### 🐛 Исправления

* change pnp to yarnrc ([c95f54c](https://github.com/SergeyKazarinov/Streaming-project/commit/c95f54ce0608a593a1ce3c5f768a0f98e8c26586))

### ⚙️ Автоматизация

* add semantic release ([538e099](https://github.com/SergeyKazarinov/Streaming-project/commit/538e0994fadc80788295c7650d5cd448b394849e))
* change npm to yarn ([670320d](https://github.com/SergeyKazarinov/Streaming-project/commit/670320d235c64fe4ebac8fea1c0b3d08e9005fde))
* change npx to yarn ([64a30be](https://github.com/SergeyKazarinov/Streaming-project/commit/64a30be87f67b8a991c0b876458d1237ad897ff2))
* fix start semantic release ([ad2ada4](https://github.com/SergeyKazarinov/Streaming-project/commit/ad2ada4f1d87818e5b14851cfca6c242a0a35e79))
* remove npm audit ([900bb6f](https://github.com/SergeyKazarinov/Streaming-project/commit/900bb6f05c50ce1adee7fbfc43ca8ae7506e0f2e))

### 🚨 Тесты

* add readme ([4f184bb](https://github.com/SergeyKazarinov/Streaming-project/commit/4f184bb4c3781a95db9bec1458777fbd5c6cc3db))
