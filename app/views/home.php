<!doctype html>
<html>
    <head>
        <title>Photos Taken By Joel Vardy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="I've taken thousands of photographs, this is a collection of my favourite ones.">
        <link rel="stylesheet" href="/css/app.css">
        <script src="/js/libs.js"></script>
        <script src="/js/app.js"></script>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-45404963-1', 'auto');
            ga('send', 'pageview');
        </script>
    </head>
    <body>
        <img class="hero" alt="Joel Vardy on Bamford Edge" src="/images/joel-vardy-bamford-edge.jpg">
        <div class="photos-container">
            <?php foreach (array_reverse($photos) as $photo) : ?>
                <a class="photo <?php echo (($photo->sizes->thumbnail->width / $photo->sizes->thumbnail->height) < 1 ? 'portrait' : ''); ?>" href="<?php echo $photo->sizes->large->filename; ?>" data-title="<?php echo $photo->title; ?>" style="background-image: url('<?php echo $photo->sizes->thumbnail->filename; ?>');"></a>
            <?php endforeach; ?>
        </div>
        <p class="information">A collection of my favourite photographs, <a href="https://joelvardy.com/" title="Joel Vardy's personal website">Joel Vardy</a> - source code can be found on <a href="https://github.com/joelvardy/photos.joelvardy.com" title="Source code on GitHub">GitHub</a>.</p>
    </body>
</html>
