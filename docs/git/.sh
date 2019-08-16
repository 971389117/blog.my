git init test
cd test
find .git/objects
find .git/objects -type f
echo 'test content' | git hash-object -w --stdin
find .git/objects -type f
git cat-file -p d670460b4b4aece5915caf5c68d12f560a9fe3e4
# 版本 1
echo 'version 1' > test.txt
git hash-object -w test.txt
# 版本 2
echo 'version 2' > test.txt
git hash-object -w test.txt
find .git/objects -type f
git cat-file -p 83baae61804e65cc73a7201a7252750c76066a30 > test.txt
cat test.txt

# 版本 2
git cat-file -p 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a > test.txt
cat test.txt
git cat-file -t 1f7a7a472abf3dd9643fd615f6da379c4acb3e3a
git update-index --add --cacheinfo 100644 \
83baae61804e65cc73a7201a7252750c76066a30 test.txt
git write-tree

# 验证一下 确实是一个树对象
git cat-file -p d8329fc1cc938780ffdd9f94e0d364e0ea74f579
echo 'new file' > new.txt
git update-index --cacheinfo 100644 \
1f7a7a472abf3dd9643fd615f6da379c4acb3e3a test.txt
git update-index --add new.txt

git write-tree
git cat-file -p 0155eb4229851634a0f03eb265b69f5a2d56f341

git read-tree --prefix=bak d8329fc1cc938780ffdd9f94e0d364e0ea74f579
git write-tree
git cat-file -p 3c4e9cd789d88d8d89c1073707c3585e41b0e614

echo 'first commit' | git commit-tree d8329f
