```
// 使用libx264编码复制截取并压缩视频
ffmpeg -i <源文件名.后缀名> -c:v libx264 -ss <开始时间> -to <结束时间> <输出文件名.后缀名>
ffmpeg -i FileName.mp4 -c:v libx264 -ss 00:00:00 -to 01:00:00 OutputName.mp4

// 无损复制截取视频
ffmpeg -i <源文件名.后缀名> -c:v copy -c:a copy -ss <开始时间> -to <结束时间> <输出文件名.后缀名>
ffmpeg -i FileName.mp4 -c:v copy -c:a copy -ss 00:00:00 -to 01:00:00 OutputName.mp4

// 通过.txt文件(要合并的所有文件的文件名)无损合并文件
ffmpeg -f concat -safe 0 -i <合并文件名文件.txt> -c copy -y <输出文件名.后缀名>
ffmpeg -f concat -safe 0 -i merge.txt -c copy -y OutputName.mp4
```

```
merge.txt

file 'file_name_1.mp4'
file 'file_name_2.mp4'
file 'file_name_3.mp4'
...
```

- `-c:v`：复制视频
- `-c:a`：复制音频
- `-c:v libx264`：`libx264`编码复制压缩视频
- `-c:v copy`：视频无损复制
- `-ss`：截取开始时间
- `-to`：截取接受时间