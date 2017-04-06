/*
 * Copyright (c) 2016, 2017, Oracle and/or its affiliates. All rights reserved.
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

// Interactive DB access module
// (the one exposed as the db variable in the shell)

#ifndef _INTERACTIVE_GLOBAL_SCHEMA_H_
#define _INTERACTIVE_GLOBAL_SCHEMA_H_

#include "modules/interactive_object_wrapper.h"

namespace shcore {
//! Interactive wrapper for the global schema
class Global_schema : public Interactive_object_wrapper {
public:
  Global_schema(Shell_core& shell_core) : Interactive_object_wrapper("db", shell_core) {};

  virtual void resolve() const;
};
}

#endif
