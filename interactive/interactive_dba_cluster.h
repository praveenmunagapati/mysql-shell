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

#ifndef _INTERACTIVE_DBA_CLUSTER_H_
#define _INTERACTIVE_DBA_CLUSTER_H_

#include "shellcore/interactive_object_wrapper.h"
#include "modules/adminapi/mod_dba_common.h"

namespace shcore {
class SHCORE_PUBLIC Interactive_dba_cluster : public Interactive_object_wrapper {
public:
  Interactive_dba_cluster(Shell_core& shell_core) : Interactive_object_wrapper("dba", shell_core) { init(); }

  void init();

  shcore::Value add_seed_instance(const shcore::Argument_list &args);
  shcore::Value add_instance(const shcore::Argument_list &args);
  shcore::Value rejoin_instance(const shcore::Argument_list &args);
  shcore::Value remove_instance(const shcore::Argument_list &args);
  shcore::Value dissolve(const shcore::Argument_list &args);
  shcore::Value check_instance_state(const shcore::Argument_list &args);
  shcore::Value rescan(const shcore::Argument_list &args);
  shcore::Value force_quorum_using_partition_of(const shcore::Argument_list &args);

private:
  bool resolve_instance_options(const std::string& function, const shcore::Argument_list &args, shcore::Value::Map_type_ref &options) const; \
  mysqlsh::dba::ReplicationGroupState check_preconditions(const std::string& function_name) const;
  void assert_not_dissolved(const std::string& function_name) const;
};
}

#endif // _INTERACTIVE_DBA_CLUSTER_H_
