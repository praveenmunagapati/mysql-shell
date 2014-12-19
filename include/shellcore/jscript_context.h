/*
 * Copyright (c) 2014, Oracle and/or its affiliates. All rights reserved.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2 of the
 * License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301  USA
 */

#ifndef _JSCRIPT_CONTEXT_H_
#define _JSCRIPT_CONTEXT_H_

#include <string>
#include <boost/system/error_code.hpp>

#include "shellcore/types.h"

namespace shcore {

struct Interpreter_delegate;

class JScript_context
{
public:
  JScript_context(Interpreter_delegate *deleg);
  ~JScript_context();

  Value execute(const std::string &code, boost::system::error_code &ret_error);

  static void init();
private:
  struct JScript_context_impl;
  JScript_context_impl *_impl;
};

};

#endif
