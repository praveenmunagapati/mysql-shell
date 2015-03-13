# Copyright (c) 2014, 2015, Oracle and/or its affiliates. All rights reserved.
# 
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; version 2 of the License.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA

include_directories( ${MYSQL_INCLUDE_DIRS} )
include_directories("${CMAKE_SOURCE_DIR}/include" "${CMAKE_SOURCE_DIR}/utils" "${Boost_INCLUDE_DIRS}")


file(GLOB libmysqlsh_SRC
    "${CMAKE_SOURCE_DIR}/include/shellcore/*.h"
    "${CMAKE_SOURCE_DIR}/utils/utils_mysql_parsing.h"
    "${CMAKE_SOURCE_DIR}/utils/utils_mysql_parsing.cc"
    "${CMAKE_SOURCE_DIR}/utils/utils_time.h"
    "${CMAKE_SOURCE_DIR}/utils/utils_time.cc"
      "*.cc"
)

# Configures V8 accordingly...
if ( HAVE_V8 )
  include_directories("${V8_INCLUDE_DIR}")
else()
  # Removes from the project all the jscript files
  file(GLOB js_SRC "*jscript*.cc")
  
  foreach(jsfile ${js_SRC})
    list(REMOVE_ITEM libmysqlsh_SRC "${jsfile}")
  endforeach()
endif()  


add_convenience_library(mysqlsh ${libmysqlsh_SRC})

if( WIN32 )
  include(msvc)
  CHANGE_MD_2_MT()
endif()

add_definitions(-DSHCORE_EXPORT )
add_definitions(-DBOOST_ALL_NO_LIB )

