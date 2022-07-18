```
// 使用libx264编码截取并压缩视频
ffmpeg -i FileName.mp4 -c:v libx264 -ss 00:00:00 -to 01:00:00 OutputName.mp4

// 无损截取视频
ffmpeg -i FileName.mp4 -c:v copy -c:a copy -ss 00:00:00 -to 01:00:00 OutputName.mp4

// 通过.txt文件(要合并的所有文件的文件名)无损合并文件
ffmpeg -f concat -safe 0 -i merge.txt -c copy -y ResultName.mp4
```

```
merge.txt

file 'file_name_1.mp4'
file 'file_name_2.mp4'
file 'file_name_3.mp4'
...
```

``
`-c:v libx264`：