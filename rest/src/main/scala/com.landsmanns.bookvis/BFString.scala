package com.landsmanns.bookvis

/**
 * Found in http://www.bubblefoundry.com/blog/2010/06/fun-with-scala-implicits/
 */
class BFString(s: String) {
  def %(in: Any*) = s.format(in: _*)
}

object BFString {
  implicit def add_%(s: String) = new BFString(s)
}