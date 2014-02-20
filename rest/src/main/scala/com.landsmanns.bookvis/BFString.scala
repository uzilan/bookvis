package com.landsmanns.bookvis

import scala.language.implicitConversions

/**
 * A solution for formatting strings with arguments like the following:
 *
 * {{{
 * scala> "The %s costs \$%d." % ("dog", 255)
 * res2: String = The dog costs \$255.
 * }}}
 *
 * The solution was found in @lin <a href="http://www.bubblefoundry.com/blog/2010/06/fun-with-scala-implicits/">http://www.bubblefoundry.com/blog/2010/06/fun-with-scala-implicits/</a>
 */
class BFString(s: String) {
  def %(in: Any*) = s.format(in: _*)
}

/**
 * Implicitly convert Strings into BFString
 */
object BFString {
  implicit def add_%(s: String) = new BFString(s)
}