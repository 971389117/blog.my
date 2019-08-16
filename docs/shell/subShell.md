# 子 shell

>命令替换会创建一个子shell来运行对应的命令。 子shell (subshell) 是由运行该脚本的shell 所创建出来的一个独立的子shell(child shell) 。正因如此,由该子shell所执行命令是无法使用脚本中所创建的变量的。
>在命令行提示符下使用路径./运行命令的话,也会创建出子shell;要是运行命令的时候不加入路径,就不会创建子shell。如果你使用的是内建的shell命令j,并不会涉及子shell。
>在命令行提示符下运行脚本时一定要留心!
>by:《Linux 命令行与 shell 脚本编程大全》 -p218

## cd 不生效
在学习的时候，经常要切换到固定的文件夹，于是写了个shell脚本用cd命令切换却发现目录切换不了。
```sh
#! /bin/bash
# c.sh

cd ~
pwd
 ```
 解释：执行的时候是./c.sh来执行的，这样执行的话终端会产生一个子shell（类似于C语言调用函数），子shell去执行我的脚本，在子shell中已经切换了目录了，但是子shell一旦执行完，马上退出，子shell中的变量和操作全部都收回。回到终端根本就看不到这个过程的变化。

验证解释:   
 ```sh
#！ /bin/bash
# c.sh

cd ~
pwd
 ```

执行`./c.sh`,可以看到输出`/Users/xxx`,说明 cd 命令在子 shell 中其实是生效了的.

解决方法:直接在终端的shell执行脚本，没有生成子shell。
1. `source c.sh`
2. `. ./c.sh`

注意上面. ./c.sh .和.中间有个空格！

:::tip
将shell脚本改为可执行文件:`chmod +x ./c.sh`
:::
