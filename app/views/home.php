<!doctype html>
<html>
    <head>
        <title>Photos Taken By Joel Vardy</title>
        <meta name="description" content="I've taken thousands of photographs, this is a collection of my favourite ones.">
        <link rel="stylesheet" href="/css/app.css">
        <script src="/js/libs.js"></script>
        <script src="/js/app.js"></script>
    </head>
    <body>
        <img class="hero" alt="Joel Vardy on Bamford Edge" src="/images/joel-vardy-bamford-edge.jpg">
        <div class="photos-container">
            <?php foreach (array_reverse($photos) as $photo) : ?>
                <a class="photo <?php echo (($photo->sizes->thumbnail->width / $photo->sizes->thumbnail->height) < 1 ? 'portrait' : ''); ?>" href="<?php echo $photo->sizes->large->filename; ?>" style="background-image: url('<?php echo $photo->sizes->thumbnail->filename; ?>');"></a>
            <?php endforeach; ?>
        </div>
        <p class="information">A collection of my favourite photographs, <a href="https://joelvardy.com/" title="Joel Vardy's personal website">Joel Vardy</a> - source code can be found on <a href="https://github.com/joelvardy/photos.joelvardy.com" title="Source code on GitHub">GitHub</a>.</p>
    </body>
</html>
