<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package Life
 */

get_header();
?>

	<main id="primary" class="site-main">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<h1 class="page-title">
					<?php
					the_search_query();
					?>
				</h1>
			</header><!-- .page-header -->

			<div class="grid-container">
				<?php
				/* Start the Loop */
				while ( have_posts() ) :

					the_post();

					get_template_part( 'template-parts/card' );

				endwhile;
				?>
			</div>

			<?php
			the_posts_navigation( array(
				'prev_text' => __( '<span class="icon-arrow icon-arrow-left"></span><span class="screen-reader-text">Older Posts</span>' ),
				'next_text' => __( '<span class="screen-reader-text">Newer Posts</span><span class="icon-arrow"></span>' ),
			));

		else :

			get_template_part( 'template-parts/content', 'none' );

		endif;
		?>

	</main><!-- #main -->

<?php
get_footer();
