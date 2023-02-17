<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Life
 */

get_header();
?>

	<main id="primary" class="site-main">

	<header class="entry-header">
		<h1 class="entry-title">Listening</h1>
	</header>

	<div class="entry-content">
	<?php
$args = array(
   'post_type' => 'post',
   'meta_query' => array(
      array(
         'key' => 'song_link',
         'value' => '',
         'compare' => '!='
      )
   )
);
$query = new WP_Query( $args );

if ( $query->have_posts() ) {
   while ( $query->have_posts() ) {
      $query->the_post();
      $song_link = get_post_meta(get_the_ID(), 'song_link', true);
      $song_artist = get_post_meta(get_the_ID(), 'song_artist', true);
      ?>
      

	  <?php 
$link = get_field('song_link');
if( $link ): 
    $link_url = $link['url'];
    $link_title = $link['title'];
    $link_target = $link['target'] ? $link['target'] : '_self';
    ?>
    <span class="song-info"><?php echo $song_artist; ?> <span class="song-title">&ldquo;<a href="<?php echo esc_url( $link_url ); ?>" target="<?php echo esc_attr( $link_target ); ?>"><?php echo esc_html( $link_title ); ?></a>&rdquo;</span>
	<a class="song-meta" href="<?php the_permalink(); ?>"><?php the_date(); ?></a>
	</span>
<?php endif; ?>

      <?php
   }
   wp_reset_postdata();
} else {
   echo 'No posts found';
}
?>

</div><!-- entry content -->


	</main><!-- #main -->

<?php
get_footer();
