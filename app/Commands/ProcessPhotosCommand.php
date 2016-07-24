<?php

namespace App\Commands;

use App\Models\Config;
use App\Models\Photo;
use Intervention\Image\ImageManager as InterventionImage;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class ProcessPhotosCommand extends Command
{

    protected function configure()
    {
        $this->setName('process:photos')
            ->setDescription('Resize new photos from the /photos directory.')
            ->addOption('force', 'f', InputOption::VALUE_NONE, 'If set, all photos will be resized.');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $outputStyle = new SymfonyStyle($input, $output);
        $photoModel = new Photo();
        $config = (new Config())->get();

        $outputStyle->title('Processing photos');

        $processedPhotos = [];
        foreach ($photoModel->getUnprocessed() as $photo) {

            $processedPhoto = [
                'title' => $photo->title,
            ];
            
            foreach ($config->sizes as $size) {

                $processedFilename = '/' . $config->directories->processed . '/' . $size->directory . '/' . $photo->filename;
                $processedFilepath = BASE_PATH . '/public' . $processedFilename;

                // Image should be resized
                if (!file_exists($processedFilepath) || $input->getOption('force')) {
                    $outputStyle->text('Resizing photo: ' . $photo->title . ' at size: ' . $size->maxDimention . 'px');
                    if (!$this->resizeImage($photo->filepath, $processedFilepath, $size->maxDimention)) {
                        // Resizing the image failed, do not save this as a processed photo
                        continue;
                    }
                }

                $imageDimentions = $this->imageDimentions($processedFilepath);

                $processedPhoto['sizes'][$size->slug] = [
                    'filename' => $processedFilename,
                    'width' => $imageDimentions->width,
                    'height' => $imageDimentions->height,
                ];

            }

            $processedPhotos[] = $processedPhoto;

        }

        $photoModel->set($processedPhotos);

        $outputStyle->success('Finished processing photos');

    }

    protected function resizeImage(string $sourceFilepath, string $destinationFilepath, int $maxDimention)
    {

        $intervention = new InterventionImage();

        if (!file_exists(dirname($destinationFilepath))) {
            mkdir(dirname($destinationFilepath), null, true);
        }

        $image = $intervention->make($sourceFilepath);
        if ($image->width() > $image->height()) {
            $image->widen($maxDimention);
        } else {
            $image->heighten($maxDimention);
        }
        $image->interlace();
        return $image->save($destinationFilepath, 90);

    }

    protected function imageDimentions(string $filepath)
    {

        list($width, $height) = getimagesize($filepath);

        return (object) [
            'width' => $width,
            'height' => $height,
        ];

    }

}
