# 底层命令

## .git目录

当在一个新目录或已有目录执行 git init 时，Git 会创建一个 .git 目录。 这个目录包含了几乎所有 Git 存储和操作的对象。 如若想备份或复制一个版本库，只需把这个目录拷贝至另一处即可。

```sh
git init test
ls test/.git
Initialized empty Git repository in /Users/zhengxingxing/Desktop/git.my/git-demo/test/.git/
HEAD        config      hooks       objects
branches    description info        refs
```


**目录结构**
- description 文件仅供 GitWeb 程序使用，我们无需关心。
- config 文件包含项目特有的配置选项。
- info 目录包含一个全局性排除（global exclude）文件，用以放置那些不希望被记录在 .gitignore 文件中的忽略模式（ignored patterns）。
- hooks 目录包含客户端或服务端的钩子脚本（hook scripts），在 Git 钩子 中这部分话题已被详细探讨过。

**核心目录**
- objects 目录存储所有数据内容；
- refs 目录存储指向数据（分支）的提交对象的指针；
- HEAD 文件指示目前被检出的分支；
- index 文件保存暂存区信息。

## Git object 对象

- mingl
git hash-object -w
git cat-file -p
初始化项目

```sh
$ git init test
Initialized empty Git repository in /tmp/test/.git/
$ cd test
$ find .git/objects
.git/objects
.git/objects/info
.git/objects/pack
$ find .git/objects -type f
```

可以看到 `.git/bojects` 目录没有文件,接下来写入内容

```sh
$ echo 'test content' | git hash-object -w --stdin
d670460b4b4aece5915caf5c68d12f560a9fe3e4
```

-w 选项指示 hash-object 命令写入(存储)数据对象；若不指定此选项，则该命令查看(返回)对应的键值。

--stdin 选项则指示该命令从标准输入读取内容；若不指定此选项，则须在命令尾部给出待存储文件的路径。

**查看刚刚写入的内容**

```sh
$ find .git/objects -type f
.git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
```

取回刚刚存入的数据

```sh
$ git cat-file -p d670460b4b4aece5915caf5c68d12f560a9fe3e4
test content
```

-p 选项可指示该命令自动判断内容的类型，并为我们显示格式友好的内容

对文件进行简单的版本控制

```sh
# 版本 1
$ echo 'version 1' > test.txt
$ git hash-object -w test.txt
83baae61804e65cc73a7201a7252750c76066a30

# 版本 2
$ echo 'version 2' > test.txt
$ git hash-object -w test.txt
1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
```

查看当前数据对象

```sh
$ find .git/objects -type f
.git/objects/1f/7a7a472abf3dd9643fd615f6da379c4acb3e3a
.git/objects/83/baae61804e65cc73a7201a7252750c76066a30
.git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4
```

恢复版本

```sh
# 版本 1
$ git cat-file -p 83baae61804e65cc73a7201a7252750c76066a30 > test.txt
$ cat test.txt
version 1

# 版本 2
$ git cat-file -p 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a > test.txt
$ cat test.txt
version 2
```

查看对象类型
```sh
$ git cat-file -t 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
blob
```

## 树对象

Git 根据 staging area 或 index 的状态创建一个对应的树对象.

将 test.txt 的首个版本添加到暂存区(通过 sha1)

```sh
$ git update-index --add --cacheinfo 100644 \
  83baae61804e65cc73a7201a7252750c76066a30 test.txt
```
必须的参数
- --add 选项，因为此前该文件并不在暂存区中；
- --cacheinfo 选项，因为将要添加的文件位于 Git 数据库中，而不是位于当前目录下。
- 文件模式
- SHA-1
- 文件名

文件模式类型
`100644 普通文件
100755 可执行文件
120000 符号链接`

将暂存区内容写入一个树对象
```sh
$ git write-tree
d8329fc1cc938780ffdd9f94e0d364e0ea74f579

# 验证一下 确实是一个树对象
$ git cat-file -p d8329fc1cc938780ffdd9f94e0d364e0ea74f579
100644 blob
```

创建一个新的树对象
```sh
$ echo 'new file' > new.txt
$ git update-index --cacheinfo 100644 \
  1f7a7a472abf3dd9643fd615f6da379c4acb3e3a test.txt
$ git update-index --add new.txt
```

暂存区现在包含了 test.txt 文件的新版本，和一个新文件：new.txt。

```sh
$ git write-tree
0155eb4229851634a0f03eb265b69f5a2d56f341
$ git cat-file -p 0155eb4229851634a0f03eb265b69f5a2d56f341
100644 blob fa49b077972391ad58037050f2a75f74e3671e92      new.txt
100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a      test.txt
```

我们注意到，新的树对象包含两条文件记录，同时 test.txt 的 SHA-1 值（1f7a7a）是先前值的“第二版”。

只是为了好玩：你可以将第一个树对象加入第二个树对象，使其成为新的树对象的一个子目录。 通过调用 read-tree 命令，可以把树对象读入暂存区。 本例中，可以通过对 read-tree 指定 --prefix 选项，将一个已有的树对象作为子树读入暂存区：

```sh
$ git read-tree --prefix=bak d8329fc1cc938780ffdd9f94e0d364e0ea74f579
$ git write-tree
3c4e9cd789d88d8d89c1073707c3585e41b0e614
$ git cat-file -p 3c4e9cd789d88d8d89c1073707c3585e41b0e614
040000 tree d8329fc1cc938780ffdd9f94e0d364e0ea74f579      bak
100644 blob fa49b077972391ad58037050f2a75f74e3671e92      new.txt
100644 blob 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a      test.txt
```

## 提交对象

创建提交对象
```sh
$ echo 'first commit' | git commit-tree d8329f
e298445ec83829563752781d8ec12df03d0c4b8d

git cat-file -p e298445e
```
提交对象的格式很简单：它先指定一个顶层树对象，代表当前项目快照；然后是作者/提交者信息（依据你的 user.name 和 user.email 配置来设定，外加一个时间戳）；留空一行，最后是提交注释。

```sh

$ echo 'second commit' | git commit-tree 0155eb -p e298445e
2b6c7bd8182b3c64567fed676db10f6355b43485
$ echo 'third commit'  | git commit-tree 3c4e9c -p 2b6c7bd8
fb35fdf07c35cfe7e65f5f8d645a3382edf8f29a
```

```sh
commit fb35fdf07c35cfe7e65f5f8d645a3382edf8f29a
Author: 971389117 <971389117@qq.com>
Date:   Mon Aug 12 16:36:57 2019 +0800

    third commit

 bak/test.txt | 1 +
 1 file changed, 1 insertion(+)

commit 2b6c7bd8182b3c64567fed676db10f6355b43485
Author: 971389117 <971389117@qq.com>
Date:   Mon Aug 12 16:36:37 2019 +0800

    second commit

 new.txt  | 1 +
 test.txt | 2 +-
 2 files changed, 2 insertions(+), 1 deletion(-)

commit e298445ec83829563752781d8ec12df03d0c4b8d
Author: 971389117 <971389117@qq.com>
Date:   Mon Aug 12 16:31:56 2019 +0800

    first commit

 test.txt | 1 +
 1 file changed, 1 insertion(+)
 ```

 太神奇了： 就在刚才，你没有借助任何上层命令，仅凭几个底层操作便完成了一个 Git 提交历史的创建。 这就是每次我们运行 git add 和 git commit 命令时， Git 所做的实质工作——将被改写的文件保存为数据对象，更新暂存区，记录树对象，最后创建一个指明了顶层树对象和父提交的提交对象。 这三种主要的 Git 对象——数据对象、树对象、提交对象——最初均以单独文件的形式保存在 .git/objects 目录下。 下面列出了目前示例目录内的所有对象，辅以各自所保存内容的注释：

```sh
$ find .git/objects -type f
.git/objects/01/55eb4229851634a0f03eb265b69f5a2d56f341 # tree 2
.git/objects/1a/410efbd13591db07496601ebc7a059dd55cfe9 # commit 3
.git/objects/1f/7a7a472abf3dd9643fd615f6da379c4acb3e3a # test.txt v2
.git/objects/3c/4e9cd789d88d8d89c1073707c3585e41b0e614 # tree 3
.git/objects/83/baae61804e65cc73a7201a7252750c76066a30 # test.txt v1
.git/objects/ca/c0cab538b970a37ea1e769cbbde608743bc96d # commit 2
.git/objects/d6/70460b4b4aece5915caf5c68d12f560a9fe3e4 # 'test content'
.git/objects/d8/329fc1cc938780ffdd9f94e0d364e0ea74f579 # tree 1
.git/objects/fa/49b077972391ad58037050f2a75f74e3671e92 # new.txt
.git/objects/fd/f4fc3344e67ab068f836878b6c4951e3b15f3d # commit 1
```
## 模拟对象存储

所有的 Git 对象均以下面这种方式存储，区别仅在于类型标识——另两种对象类型的头部信息以字符串“commit”或“tree”开头，而不是“blob”。 另外，虽然数据对象的内容几乎可以是任何东西，但提交对象和树对象的内容却有各自固定的格式。

```ruby
content = "what is up, doc?"
# Git 以对象类型作为开头来构造一个头部信息，本例中是一个“blob”字符串。 接着 Git 会添加一个空格，随后是数据内容的长度，最后是一个空字节（null byte）：
header = "blob #{content.length}\0"
store = header + content

require 'digest/sha1'
# SHA1 校验
sha1 = Digest::SHA1.hexdigest(store)
# =>"bd9dbf5aae1a3862dd1526723246b20206e5fc37"

require 'zlib'
zlib_content = Zlib::Deflate.deflate(store)

path = '.git/objects/' + sha1[0,2] + '/' + sha1[2,38]
require 'fileutils'
FileUtils.mkdir_p(File.dirname(path))
File.open(path, 'w') { |f| f.write zlib_content }
```

